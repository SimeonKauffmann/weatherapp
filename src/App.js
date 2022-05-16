import { useState } from "react"
import { fetchCoordinates, fetchWeather } from "./httpClient"

function App() {
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState("London")

  async function handleSubmit(e) {
    e.preventDefault()
    const city = e.target.city.value
    const coords = await fetchCoordinates(city, e.target.country.value)
    const weather = await fetchWeather(coords)
    setCity(city.charAt(0).toUpperCase() + city.slice(1))
    setWeather(weather)
  }

  return (
    <div className="App">
      <h1>My Awesome Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>City:</label> <br />
        <input name="city" defaultValue="London"></input>
        <br />
        <label>Country:</label>
        <br />
        <input
          name="country"
          defaultValue="GB"
          maxLength={2}
          minLength={2}
        ></input>
        <br />
        <input type={"submit"} />
      </form>

      {weather.city && (
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
          <br />
          {city}
          <br />
          {weather.description}
          <br />
          {weather.temp}
          <br />
        </div>
      )}
    </div>
  )
}

export default App
