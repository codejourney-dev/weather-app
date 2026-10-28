import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import "./theme/theme.css";
import Header from "./components/layout/Header";
import { useLanguage } from "./context/LanguageContext";
import WeatherWarp from "./features/weather/WeatherWarp";
import AirWarp from "./features/airQuality/AirWarp";
import MarineWarp from "./features/marineWeather/MarineWarp"
import "./components/weather-visuals/weather-visuals.css";
import { resolveWeatherVisual } from "./theme/weatherVisuals";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";

import BackgroundLayer from "./theme/BackgroundLayer";
import WeatherEffects from "./effects/WeatherEffects";

function App() {
  const {language, setLanguage} = useLanguage();
  //Store Raw weather data
  const [data, setData] = useState(null);
  //Store transformed current weather data
  const [weatherData, setWeatherData] = useState(null); 
  //Store transformed hourly forecast data
  const [hourlyData, setHourlyData] = useState(null);
  //Store transformed 7-day forecast data
  const [forecastData, setForeCastData] = useState(null);
  // default city
  const defaultCity = {
    name: language === "fa" ? "تهران" : "Tehran",
    country: language === "fa" ? "ایران" : "Iran",
    admin1: language === "fa" ? "تهران" : "Tehran",
    latitude: 35.69439,
    longitude: 51.42151,
  };
  //active city initial value
  const [activeCity, setActiveCity] = useState(() => {
    const savedCity = localStorage.getItem("activeCity");

    return savedCity ? JSON.parse(savedCity) : defaultCity;
  });
  //selected cities initial value
  const [selectedCities, setSelectedCities] = useState(() => {
    const savedCities = localStorage.getItem("selectedCities");

    return savedCities ? JSON.parse(savedCities) : [defaultCity];
  });
  // active city is a coastal city
  const [coastalCity, setCoastalCity] = useState(null);
  //panel settings
  const [activePanel, setActivePanel] = useState(null); //location, settings ->menu-open, setting-open
  // visual data
  const visualState = resolveWeatherVisual(data?.current, data?.daily);
  const isWindy = Number(data?.current?.wind_speed_10m) >= 35;
  
  const defaultUnits = {
    temperature: "celsius",
    windSpeed: "kmh",
    pressure: "hpa",
  };

  const [units, setUnits] = useState(()=>{
    const savedUnits = localStorage.getItem("units");

    return savedUnits ? JSON.parse(savedUnits) : defaultUnits;
  })

  const handleLanguageChange = async (nextLanguage) => {
      if (nextLanguage === language) return;
      setLanguage(nextLanguage);
      const translatedCities = await Promise.all(
        selectedCities.map(async (city) => {
          if (!city.id) {
            return {
              ...city,
              name: nextLanguage === "fa" ? "تهران" : "Tehran",
              country: nextLanguage === "fa" ? "ایران" : "Iran",
              admin1: nextLanguage === "fa" ? "تهران" : "Tehran",
            };
          }
          try {
            const url =
              `https://geocoding-api.open-meteo.com/v1/get` +
              `?id=${city.id}&language=${nextLanguage}`;

            const response = await fetch(url);

            if (!response.ok) {
              throw new Error("Failed to translate city");
            }

            const translatedCity = await response.json();

            return {
              ...city,
              ...translatedCity,
              latitude: city.latitude,
              longitude: city.longitude,
            };
          } catch (error) {
            console.error("Error translating city:", error);
            return city;
          }
        })
      );

      setSelectedCities(translatedCities);

      setActiveCity((currentCity) =>
        translatedCities.find(
          (city) =>
            city.latitude === currentCity.latitude &&
            city.longitude === currentCity.longitude
        ) ?? currentCity
      );
  };
  useEffect(() => {
    document
      .getElementById("root")
      ?.setAttribute("data-theme", visualState.theme);
  }, [visualState.theme]);
  //local storages
  useEffect(() => {
    localStorage.setItem(
      "activeCity",
      JSON.stringify(activeCity)
    );
  }, [activeCity]);
  useEffect(() => {
    localStorage.setItem(
      "selectedCities",
      JSON.stringify(selectedCities)
    );
  }, [selectedCities]);
  useEffect(()=>{
    localStorage.setItem("units", JSON.stringify(units));
  }, [units]);
  return (
    <>
      <BackgroundLayer
        theme={visualState.theme}
        timeOfDay={visualState.timeOfDay}
        condition={visualState.condition}
        windy={isWindy}
        style={visualState.style}
      />
      <WeatherEffects
        condition={visualState.condition}
        theme={visualState.theme}
        timeOfDay={visualState.timeOfDay}
        windy={isWindy}
      />
      <div 
        className={`app-container theme-${visualState.theme} phase-${visualState.timeOfDay} condition-${visualState.condition}${isWindy ? " effect-windy" : ""} ${activePanel == "location" ? "menu-open" : activePanel == "setting" ? "setting-open" : ""}`}
        dir={language == "fa" ? "rtl" : "ltr"}
      >
        {/* navbar showing current location, menu & setting button */}
        <Header 
          activeCity={activeCity} 
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          coastalCity={coastalCity}
          setActiveCity={setActiveCity}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
          units={units}
          setUnits={setUnits}
          onLanguageChange={handleLanguageChange}
        />
        <MarineWarp
          activeCity={activeCity}
          setCoastalCity={setCoastalCity}
        />
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
          units={units}
        />
        {/* showing current situation temperature & some information */}
        <Routes>
          <Route
            path='/'
          />
          {/* Air Quality Section */}
          <Route
            path='/airQuality'
            element={
              <AirWarp 
                activeCity={activeCity}
              />
            }
          />
          {/* Marine Weather Section */}
          <Route
            path="/marineWeather"
            element={<div />}
          />
          
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
        
        <Footer />
      </div>
    </>
  )
}

export default App;

