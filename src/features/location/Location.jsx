import { useState } from 'react';
import {CircleX} from 'lucide-react';
// {onCitySelect, selectedCity}
function Location({activeCity, setActiveCity, selectedCities, setSelectedCities}){
    //hold user input
    const [query, setQuery] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    

    // handle input field changes
    const handleInputChange = async (e) => {
      const value = e.target.value;

      setQuery(value);

      if (value.length >= 3) {
        try {
          const baseUrl = "https://geocoding-api.open-meteo.com/v1/search?";

          const encodedCityName = encodeURIComponent(value);

          const url = `${baseUrl}name=${encodedCityName}&count=5`;

          const response = await fetch(url);

          const data = await response.json();

          if (data.results) {
            setSuggestion(data.results);
          } else {
            setSuggestion([]);
          }
        } catch (error) {
          console.log("Error fetching city suggestion: ", error);
          setSuggestion([]);
        }
      } else {
        setSuggestion([]);
      }
    }

    const handleSuggestionClick = (city) => {
      if(selectedCities.length === 5){
        setQuery("");
        setSuggestion([]);
        return selectedCities;
      }
      setSelectedCities((prevCities) => {
      const alreadyExists = prevCities.some(
        (item) => item.latitude === city.latitude && item.longitude === city.longitude
      );
      if (alreadyExists) {
        return prevCities;
      }

      return [...prevCities, city];
    });
      setQuery("");
      setSuggestion([]);
    }

    const handleRemoveCity = (cityToRemove) => {
      setSelectedCities((prevCities) => {
        if (selectedCities.length <= 1) {
          return prevCities;
        }
        if(cityToRemove.name == activeCity.name){
          if(cityToRemove !== selectedCities[0]){
            setActiveCity(selectedCities[0]);
          }else{
            setActiveCity(selectedCities[1]);
          }
        }
        return prevCities.filter(
          (city) =>
            city.latitude !== cityToRemove.latitude ||
            city.longitude !== cityToRemove.longitude
        )
      });
    };
    const handleActiveCity = (city) => {
      setActiveCity(city);
    }
    return(
        <section className="location-mgt ">
          <div className="header">
              <input 
                type="text" 
                value={query}
                className='search-input card'
                placeholder='Search for city...'
                id='search-input'
                onChange={handleInputChange}
              />
              {suggestion.length > 0 &&(
                <ul className='suggestion-list card'>
                  {suggestion.map((city, index)=>(
                    <li 
                      key={index}
                      className='suggestion-item card'
                      onClick={()=>handleSuggestionClick(city)}
                    >
                      {city.name},{city.country}
                    </li>
                  ))}
                </ul>
              )}
          </div>
          {/* city list */}
          {selectedCities.length > 0 && (
            <div className="locations">
              {selectedCities.map((city)=>(
                <div 
                  key={`${city.latitude}-${city.longitude}`}
                  className={`location card ${
                    activeCity.latitude === city.latitude &&
                    activeCity.longitude === city.longitude
                      ? "is-selected"
                      : ""
                  }`}
                  onClick={() => handleActiveCity(city)}
                >
                    <div>
                      <h4>{city.name}, {city.country}</h4>
                      <sub>{city.admin1}</sub>
                    </div>
                    {selectedCities.length > 1 &&(
                      <button
                        type='button'
                        onClick={
                          (e) => { e.stopPropagation();
                          handleRemoveCity(city)}}
                        aria-label={`Remove ${city.name}`}
                      >
                        <CircleX /> 
                      </button>
                    )}     
                </div>
              ))}
            </div>
          )}
        </section>
    )
}

export default Location;