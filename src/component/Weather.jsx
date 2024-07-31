import React, { useState } from "react";
import { Search, MapPin, Wind } from "react-feather";
import dateFormat from "dateformat";

function Weather() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState({});

  const apiKey = "ecfd88dcf1e4639dcf559a48f2f37f88";
  const getWeather = async (city) => {
    return await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  };
  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd,mmmm dS,h:MM TT");
  };
  return (
    <>
      <div className="app">
        <h1>Weater App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Please Enter City Name"
          />
          <button onClick={() => getWeatherbyCity()}>
            <Search></Search>
          </button>
        </div>
        {weather && weather.weather && (
          <div className="content">
            <div className="location d-flex">
              <MapPin></MapPin>
              <h2>
                {weather.name} <span>({weather.sys.country})</span>
              </h2>
            </div>
            <p className="datetext"> {renderDate}</p>
            <div className="weatherdesc d-flex flex-c">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}10d@2x.png`}
                alt=""
              />
              <h3>{weather.weather[0].description}</h3>
            </div>
            <div className="tempstats d-flex flex-c">
              <h1>
                {weather.main.temp} <span>&deg:C</span>
              </h1>
              <h3>
                Feels like {weather.main.feels_like}
                <span>&deg:C</span>
              </h3>
            </div>
            <div className="windstats d-flex">
              <Wind></Wind>
              <h3>
                {" "}
                Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg:
              </h3>
            </div>
          </div>
        )}
        {!weather.weather && (
          <div className="content">
            <h4> No Data Found!</h4>
          </div>
        )}
        {/* <p>{JSON.stringify(weather)}</p> */}
      </div>
    </>
  );
}

export default Weather;
