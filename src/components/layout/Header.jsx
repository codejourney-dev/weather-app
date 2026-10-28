
import { useEffect, useRef, useState } from "react";
import { Settings, Search, Menu, CircleX } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Location from "../../features/location/Location";
import Setting from "../../features/setting/Setting";
import "./Header.css";

function Header({
  activeCity,
  activePanel,
  setActivePanel,
  coastalCity,
  setActiveCity,
  selectedCities,
  setSelectedCities,
  units,
  setUnits,
  onLanguageChange,
}) {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const { language, t } = useLanguage();
  const headerRef = useRef(null);

  const isLocationOpen = activePanel === "location";
  const isSettingsOpen = activePanel === "setting";
  const isMobileMenuOpen = activePanel === "mobile-menu";

  const handleInputChange = async (e) => {
    const value = e.target.value;

    setQuery(value);

    if (value.trim().length < 3) {
      setSuggestion([]);
      return;
    }

    try {
      const encodedCityName = encodeURIComponent(value.trim());

      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedCityName}&count=5&language=${language}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch city suggestions");
      }

      const data = await response.json();
      setSuggestion(data.results ?? []);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestion([]);
    }
  };
  const handleSuggestionClick = (city) => {
    setSelectedCities((prevCities) => {
      const alreadyExists = prevCities.some(
        (item) =>
          item.latitude === city.latitude &&
          item.longitude === city.longitude
      );

      if (alreadyExists || prevCities.length >= 5) {
        return prevCities;
      }

      return [...prevCities, city];
    });

    setQuery("");
    setSuggestion([]);
  };
  const togglePanel = (panel) => {
    setActivePanel((current) =>
      current === panel ? null : panel
    );
  };
  
  
  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const clickedInsideHeader = target.closest(".app-header");
      const clickedInsideLocation = target.closest(".location-panel-shell");
      const clickedInsideSettings = target.closest(
        "[data-panel-root='setting']"
      );
      if (
        clickedInsideHeader ||
        clickedInsideLocation ||
        clickedInsideSettings
      ) {
        return;
      }
      setActivePanel(null);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setActivePanel]);

  const closeMenu = () => setActivePanel(null);

  return (
    <header className="app-header" ref={headerRef}>
      <div className="header-brand">
        <Link
          to="/"
          className="brand-name"
          onClick={closeMenu}
        >
          Weather App
        </Link>
      </div>

      <nav
        className={`header-nav ${
          isMobileMenuOpen ? "is-open" : ""
        }`}
        aria-label="Main navigation"
      >
        <NavLink to="/" end onClick={closeMenu}>
          {language === "fa" ? "آب‌وهوا" : "Weather"}
        </NavLink>

        <NavLink to="/airQuality" onClick={closeMenu}>
          {t.ui.airQuality}
        </NavLink>

        {coastalCity && (
          <NavLink
            to="/marineWeather"
            onClick={closeMenu}
          >
            {t.ui.marineWeather}
          </NavLink>
        )}
      </nav>

      <div className="header-actions">
        <div
          className={`add-city ${isLocationOpen ? "is-open" : ""}`}
        >
          {isLocationOpen ? (
            <div className="city-search">
                <input
                  type="text"
                  className="city-trigger city-trigger-input"
                  value={query}
                  onChange={handleInputChange}
                  placeholder={
                    language === "fa" ? "جست‌وجوی شهر..." : "Search city..."
                  }
                  aria-label={
                    language === "fa" ? "جست‌وجوی شهر" : "Search city"
                  }
                  aria-controls="location-panel"
                  autoFocus
                />
                <button
                  type="button"
                  className="city-search-close"
                  onClick={() => {
                    setQuery("");
                    setActivePanel(null);
                  }}
                  aria-label={language === "fa" ? "بستن جست‌وجو" : "Close search"}
                >
                  <CircleX size={18} />
                </button>
            </div>
          ) : (
            <button
              type="button"
              className="city-trigger"
              aria-expanded={false}
              aria-controls="location-panel"
              onClick={() => setActivePanel("location")}
            >
              <Search size={19} aria-hidden="true" />

              <span className="city-trigger-name">
                {activeCity?.name ??
                  (language === "fa" ? "انتخاب شهر" : "Select city")}
              </span>

              {activeCity?.country && (
                <span className="city-trigger-country">
                  {activeCity.country}
                </span>
              )}
            </button>
          )}

          <div
            id="location-panel"
            className={`location-panel-shell ${
              isLocationOpen ? "is-open" : ""
            }`}
            aria-hidden={!isLocationOpen}
            inert={!isLocationOpen}
          >
            {suggestion.length > 0 &&(
              <ul className='suggestion-list'>
                {suggestion.map((city, index)=>(
                  <li 
                    key={index}
                    className='suggestion-item'
                    onClick={()=>handleSuggestionClick(city)}
                  >
                    {city.name},{city.country}
                  </li>
                ))}
              </ul>
            )}
            <Location
              activeCity={activeCity}
              setActiveCity={setActiveCity}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              activePanel={activePanel}
              query={query}
              setQuery={setQuery}
              suggestion={suggestion}
              setSuggestion={setSuggestion}
              setActivePanel={setActivePanel}
            />
          </div>
        </div>


        {/* Setting Section */}
        <div className="settings-dropdown">
          <button
            type="button"
            className="header-icon-button settings-trigger"
            aria-label={t.ui.settings}
            aria-expanded={isSettingsOpen}
            onClick={() => togglePanel("setting")}
          >
            <Settings size={21} aria-hidden="true" />
          </button>

          <div
            className={`settings-panel-shell ${
              isSettingsOpen ? "is-open" : ""
            }`}
            aria-hidden={!isSettingsOpen}
            inert={!isSettingsOpen}
          >
            <Setting
              activePanel={activePanel}
              units={units}
              setUnits={setUnits}
              onLanguageChange={onLanguageChange}
              onClose={() => setActivePanel(null)}
            />
          </div>
        </div>
        {/* Mobile menu */}
        <button
          type="button"
          className="header-icon-button mobile-menu-trigger"
          aria-label={
            isMobileMenuOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={isMobileMenuOpen}
          onClick={() => togglePanel("mobile-menu")}
        >
          {isMobileMenuOpen ? (
            <CircleX size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
