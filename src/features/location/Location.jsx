import { useEffect } from 'react';
import {CircleX} from 'lucide-react';
function Location({
  activeCity, 
  setActiveCity, 
  selectedCities, 
  setSelectedCities, 
  activePanel,
  setQuery,
  setActivePanel
}){
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
      setQuery("");
      setActivePanel(null);
    }
    useEffect(() => {
      localStorage.setItem(
        "selectedCities",
        JSON.stringify(selectedCities)
      );
    }, [selectedCities]);
    useEffect(() => {
      localStorage.setItem(
        "activeCity",
        JSON.stringify(activeCity)
      );
    }, [activeCity]);
    return(
        <section className={`location-mgt ${activePanel=="location" ? "menu-open" : ""}`}>
          <div className="header">
            <button
              type="button"
              className="panel-close-button"
              onClick={() => setActivePanel(null)}
              aria-label="Close location panel"
            >
              <CircleX size={22} />
            </button>
          </div>
          {/* city list */}
          {selectedCities.length > 0 && (
            <div className="locations">
              {selectedCities.map((city)=>(
                <div 
                  key={`${city.latitude}-${city.longitude}`}
                  className={`location ${
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
                    <div>
                      
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