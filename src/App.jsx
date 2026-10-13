import { useState, useEffect } from 'react';
import './App.css';
import Footer from "./components/layout/Footer";
import Setting from "./features/setting/Setting";
import Location from "./features/location/Location";
import AirQuality from "./features/weather/AirQuality";
import Navigation from "./components/layout/Navigation";
import MarineWeather from "./features/weather/MarineWeather";
import CurrentWeather from "./features/weather/CurrentWeather";
import HourlyForecast from "./features/weather/HourlyForecast";
import WeeklyForecast from "./features/weather/WeeklyForecast";
import WeatherDetails from "./features/weather/WeatherDetails";
import HistoricalWeather from "./features/weather/HistoricalWeather";


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
        <CurrentWeather />
        {/* forecast section */}
        <div className="forecast-warp">
          {/* hourly forecast section */}
          <HourlyForecast />
          {/* weekly forecast section */}
          <WeeklyForecast />
          {/* weather condition details */}
          <WeatherDetails />
          {/* air quality section*/}
          <AirQuality />
          {/* Marine weather section if coastal city */}
          <MarineWeather />
          {/* historical weather section */}
          <HistoricalWeather />
          {/* footer section */}
          <Footer />
        </div>
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

