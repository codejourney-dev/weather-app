import { useLanguage } from "../../context/LanguageContext";
import { CircleX } from "lucide-react";

function Setting({
  activePanel,
  units, 
  setUnits, 
  onLanguageChange,
  onClose
}){

    const {language, t} =useLanguage();
    const changeLanguage = (lang) => {
      onLanguageChange(lang);
    };

    return(
        <section 
          className={`setting-menu ${activePanel == "setting" ? "setting-open" : ""}`}
          data-panel-root="setting"
        >
          <div className="setting-header">
            <button
              type="button"
              className="panel-close-button"
              onClick={onClose}
              aria-label={language === "fa" ? "بستن تنظیمات" : "Close settings"}
            >
              <CircleX size={22} />
            </button>
          </div>
          <div className="header">
            <h2>{t.ui.settings}</h2>
          </div>
          <div className="contain">
            <div className="change-lang">
              <div className="head">
                <h4>{t.ui.language}</h4>
              </div>
              <div className="setting-btns">
                <button
                  className={`${language=="en" ? "is-selected" : ""}`}
                  onClick={()=>changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className={`${language=="fa" ? "is-selected" : ""}`}
                  onClick={()=>changeLanguage("fa")}
                >
                  فارسی
                </button>
              </div>
            </div>
            <div className="change-units">
              <div className="change-contain">
                <div className="head"><h4>{t.ui.temperature}</h4></div>
                <div className="change-warp setting-btns">
                  <button 
                  type="button"
                    className={` ${
                      units.temperature === "celsius" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        temperature: "celsius",
                      }))
                    }
                  >
                    Celsius
                  </button>
                  <button 
                  type="button"
                    className={` ${
                      units.temperature === "fahrenheit" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        temperature: "fahrenheit",
                      }))
                    }
                  >
                    Fahrenheit
                  </button>
                </div>
              </div>
              <div className="change-speed">
                <div className="head"><h4>{t.ui.windSpeed}</h4></div>
                <div className="setting-btns">
                  <button 
                    className={` ${
                      units.windSpeed === "ms" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        windSpeed: "ms",
                      }))
                    }
                  >
                    m/s
                  </button>
                  <button 
                    className={` ${
                      units.windSpeed === "kmh" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        windSpeed: "kmh",
                      }))
                    }
                  >
                    km/h
                  </button>
                  <button 
                    className={` ${
                      units.windSpeed === "mph" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        windSpeed: "mph",
                      }))
                    }
                  >
                    mph
                  </button>
                </div>
              </div>
              <div className="change-speed">
                <div className="head"><h4>{t.ui.windSpeed}</h4></div>
                <div className="setting-btns">
                  <button 
                    className={` ${
                      units.pressure === "mmhg" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        pressure: "mmhg",
                      }))
                    }
                  >
                    mmHg
                  </button>
                  <button 
                    className={` ${
                      units.pressure === "mbar" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        pressure: "mbar",
                      }))
                    }
                  >
                    mbar
                  </button>
                  <button 
                    className={` ${
                      units.pressure === "hpa" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        pressure: "hpa",
                      }))
                    }
                  >
                    hPa
                  </button>
                  <button 
                    className={` ${
                      units.pressure === "inhg" ? "is-selected" : ""
                    }`}
                    onClick={() =>
                      setUnits((prev) => ({
                        ...prev,
                        pressure: "inhg",
                      }))
                    }
                  >
                    inHg
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

export default Setting;