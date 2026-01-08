import React, { useState, useEffect } from "react";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (searchValue.length > 2) {
      handleSearch();
    }
  }, [searchValue]);

  // Called ONLY when clicking Search button
  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${searchValue}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data?.list) {
        setSuggestions(data.list);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch final weather data when selecting a city
  const fetchCityWeather = async (cityName) => {
    setLoading(true);
    setSuggestions([]);
    setQuery(cityName);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const getFlagUrl = (country) => `https://flagsapi.com/${country}/flat/64.png`;

  const getWeatherIcon = (icon) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Weather Search</h2>

      {/* Search Input */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter city name"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Search Button */}
      {/* <button
        onClick={fetchSuggestions}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button> */}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div
          style={{
            border: "1px solid #eee",
            marginTop: "10px",
            borderRadius: "5px",
            background: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((city) => (
            <div
              key={city.id}
              onClick={() => {
                fetchCityWeather(city.name);
                setWeatherIcon(city.weather[0].icon);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #f2f2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {city.name}, {city.sys.country}{" "}
                {
                  <img
                    src={getFlagUrl(city.sys.country)}
                    alt={`${city.sys.country} flag`}
                    style={{ width: "25px", height: "25px", marginLeft: "5px" }}
                  />
                }
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  float: "right",
                }}
              >
                {city.weather[0].main}{" "}
                {
                  <img
                    src={getWeatherIcon(city.weather[0].icon)}
                    alt={`${city.weather[0].main} icon`}
                    style={{
                      width: "25px",
                      height: "25px",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />
                }{" "}
                {city.main.temp}°C
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weather Display */}
      {loading && <p>Loading weather...</p>}

      {weather && !loading && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ marginRight: "20px" }}>{weather.name}</h2>
            <img src={getFlagUrl(weather.sys.country)} width={64} alt="flag" />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "20px" }}>
              <h2>{weather.main.temp}°C</h2>
              <p>{weather.weather[0].description}</p>
            </div>
            <div>
              <img
                src={getWeatherIcon(weatherIcon)}
                alt="weather icon"
                width={50}
              />
              <img
                src={getWeatherIcon(weather.weather[0].icon)}
                alt="weather icon"
                width={50}
              />
            </div>
          </div>

          {/* <p>Temperature: {weather.main.temp}°C</p> */}
          <p>Feels Like: {weather.main.feels_like}°C</p>
          {/* <p>Condition: {weather.weather[0].description}</p> */}
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
