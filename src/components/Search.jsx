import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-2xl">
        <input 
          type="text"
          placeholder="Search for movies, TV shows..."
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
          className="w-full px-6 py-4 pl-12 text-white bg-white/10 backdrop-blur-lg 
                   border border-white/20 rounded-2xl shadow-2xl
                   focus:outline-none focus:ring-4 focus:ring-blue-500/50 
                   focus:border-blue-500/30 transition-all duration-300
                   placeholder:text-gray-300 placeholder:text-lg
                   hover:bg-white/15"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg 
            className="w-6 h-6 text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2
                     text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Search
