import React, { useState } from 'react'

function Weather() {
  const [city, setCity] =useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] =useState(null)

  function handleChange(e){
     setCity(e.target.value)
  }
 

  function handleSubmit(e){
     e.preventDefault()

     if(city.trim() !== ''){
        fetchweatherdata()
     }
  }

  function fetchweatherdata(){
      const Api_key = '1bc36dde4dbf15e7473ae3532a0d3ef9';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`
       fetch(url)
       .then((response) =>response.json())
       .then((data) =>{
        if(data.cod === 200){
            setWeather(data)
            setError(null)
        }else{
           setWeather(null)
           setError('City not found. Please try again.')
        }
        setCity("")
       })
       .catch((error) =>{
         console.log(error)
         setWeather(null)
         setError('Error retrieving weather data. Please try again.')
       })
  }


  return (
     <div>
       <form onSubmit={handleSubmit}>
         <input type="text"
            value={city}
            onChange={handleChange}
          />
          <button>Get Weather</button>
       </form>
       <div>
         {weather && (
            <div className='main'>
              <h4>{weather.name}</h4>
              <p>Temperature: {weather.main.temp}*C</p>  
              <p>Descrition: {weather.weather[0].description}</p>
            </div>
         )}
         {error && <div>{error}</div>}
       </div>
    </div>
  )
}

export default Weather
