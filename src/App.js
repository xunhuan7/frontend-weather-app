import React, {useState} from "react";
import axios from "axios";
import './App.css'

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://139.155.86.169:8080/api/weather?city=${city}`)
      .then((res) => {
        setWeather(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data);
        setWeather(null);
      });
  };

  return (
    <div className="app">
      <div className="overviewContainer">
        {
          weather
            ?
            <div className="weather">
              <h2>{weather?.city}</h2>
              <img src={"https://openweathermap.org/img/wn/" + weather?.icon + "@2x.png"} alt=""/>
              <h2>{weather?.temp && weather?.temp + '°C'}</h2>
              <h2>{weather?.description}</h2>
            </div>
            :
            <h1>Check the current weather in a city</h1>
        }
        {error && <div className="error">{error}</div>}
      </div>
      <div className="checkContainer">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Input city name"
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={handleChange}
            required
          />
          <button type="submit">Check</button>
        </form>
      </div>
    </div>
  );
}

export default WeatherApp;
