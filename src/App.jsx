import { useState } from 'react';
import './App.css';

import Navigation from "./components/layout/Navigation";
import Setting from "./features/setting/Setting";
import Location from "./features/location/Location";
import WeatherWarp from "./features/weather/WeatherWarp";




function App() {
  //Store Raw weather data
  const [data, setData] = useState(null);
  //Store transformed current weather data
  const [weatherData, setWeatherData] = useState(null); 
  //Store transformed hourly forecast data
  const [hourlyData, setHourlyData] = useState(null);
  //Store transformed 7-day forecast data
  const [forecastData, setForeCastData] = useState(null);

  const defaultCity = {
      name: "Tehran",
      country: "Iran",
      admin1: "Tehran",
      latitude: 35.69439,
      longitude: 51.42151,
    };
  const [activeCity, setActiveCity] = useState(defaultCity);
  const [selectedCities, setSelectedCities] = useState([defaultCity]);

  
  return (
    <>
      <div className="app-container">
        {/* navbar showing current location, menu & setting button */}
        <Navigation activeCity={activeCity}/>
        {/* showing current situation temperature & some information */}
        <WeatherWarp 
          data={data}
          setData={setData}
          activeCity={activeCity}
          weatherData={weatherData}
          setWeatherData={setWeatherData}
          forecastData={forecastData}
          setForeCastData={setForeCastData}
          hourlyData={hourlyData}
          setHourlyData={setHourlyData}
        />
        {/* setting section:change language & units */}
        <Setting />
        {/* location management section:add different location & manage them */}
        <Location 
          activeCity={activeCity}
          setActiveCity={setActiveCity}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
      </div>
    </>
  )
}

export default App;

