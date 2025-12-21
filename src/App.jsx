import React from "react";
import { useState, useEffect } from "react";
import Search from "./components/Search";

const API_KEY = "7f2eb566"; // ¡Cambia esto por tu key real cuando la tengas!
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    if (!searchTerm.trim() || searchTerm.trim().length < 3) {
      setMovieList([]);
      setErrorMessage(
        searchTerm.trim().length < 3 && searchTerm.trim().length > 0
          ? "Escribe al menos 3 letras para buscar"
          : ""
      );
      setIsLoading(false);
      return; // No hace la petición
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${BASE_URL}&s=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) throw new Error("Error en la red");

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(
          data.Error === "Too many results"
            ? "Demasiados resultados. Prueba con un término más específico"
            : data.Error || "No se encontraron resultados"
        );
        setMovieList([]);
      } else {
        setMovieList(data.Search || []);
      }
    } catch (error) {
      setErrorMessage("Error al conectar con la API");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchMovies();
    } else {
      setMovieList([]);
      setErrorMessage("");
    }
  }, [searchTerm]);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="body glass animate-fade-in fixed inset-0 -z-10" />
      <div className="wrapper p-4 md:p-8 max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-gradient text-glow text-4xl md:text-6xl font-bold mb-4">
            Find movies and TV shows
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Discover your next favorite film or series
          </p>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="mt-12">
          {isLoading ? (
            <p className="text-center text-2xl">Loading...</p>
          ) : errorMessage ? (
            <p className="text-center text-2xl text-red-400">{errorMessage}</p>
          ) : movieList.length === 0 ? (
            <p className="text-center text-xl text-gray-400">
              Busca una película o serie para comenzar
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movieList.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://placehold.co/300x450/333333/FFFFFF/png?text=No+Poster"
                    }
                    alt={`${movie.Title} poster`}
                    className="w-full h-auto object-cover rounded-t-lg"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/300x450/333333/FFFFFF/png?text=No+Poster";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-4 absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg truncate">
                      {movie.Title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {movie.Year} • {movie.Type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
