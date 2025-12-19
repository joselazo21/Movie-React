import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {console.log("HOAKSDJASFJ");
});

  return (
    <div className='card' onClick={()=> setCount((prevState) => prevState +1 ) }> 
    <button onClick={() => setHasLiked(!hasLiked)}>
      {hasLiked ? '❤️' : '🤍'}
    </button>
    <h2>{title} <br/> {count}</h2>
    </div>
  )
} 
const App = () => {
  return (
     <div className= 'card-container'> 
      <Card title = "Hola"/>
      <Card title = "Mundo"/>
     <h2> hola </h2>
     </div> 
  )
}

export default App