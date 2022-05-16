import axios from "axios"
import { apikey } from "./secrets"

export async function fetchCoordinates(city, country) {
  const data = await axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apikey}`
    )
    .then((res) => res.data[0])
  return { lat: data.lat, lon: data.lon }
}

export async function fetchWeather(coords) {
  const data = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apikey}`
    )
    .then((res) => res.data)
  return {
    city: data.name,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    temp: Math.ceil(data.main.temp - 273.15),
  }
}
