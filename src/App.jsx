import { useEffect, useState } from 'react'
import './App.css'
import Exchange from './Exchange';

function App() {
  const initailRate = 1.1;
  const [rate, setRate] = useState(initailRate);

  // execute once after render, use param empty array []
  useEffect(() => {
    // code executed after render
    const interval = setInterval(() => {
      const randomChange = (Math.random() * 0.1) - 0.05;
      setRate((initailRate + randomChange).toFixed(2));
    }, 3000);
    // clean up
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <h1>Exchange rate : {rate}</h1>
      <Exchange rate={rate} />
    </>
  )
}

export default App
