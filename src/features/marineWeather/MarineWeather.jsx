
import Carousel from "../../components/ui/Carousel";
import "./marine-weather.css";
import { useLanguage } from "../../context/LanguageContext";
function MarineWeather({
  currentMarineData,
  hourlyMarineData,
  dailyMarineData,
}) {
    const { t , language } = useLanguage();
    const currentItems = [
        {
        label: language == "fa" ? "ارتفاع موج" : "Wave Height",
        key: "wave_height",
        unit: "m",
        },
        {
        label: language == "fa" ? "جهت موج" : "Wave Direction",
        key: "wave_direction",
        unit: "°",
        },
        {
        label: language == "fa" ? "دوره موج" : "Wave Period",
        key: "wave_period",
        unit: "s",
        },
        {
        label: language == "fa" ? "دمای سطح دریا" : "Sea Surface Temperature",
        key: "sea_surface_temperature",
        unit: "°C",
        },
        {
        label: language == "fa" ? "سرعت جریان اقیانوسی" : "Ocean Current Velocity",
        key: "ocean_current_velocity",
        unit: "m/s",
        },
        {
        label: language == "fa" ? "جهت جریان اقیانوسی" : "Ocean Current Direction",
        key: "ocean_current_direction",
        unit: "°",
        },
    ];
    const hourlyItems = [
        {
        label: language == "fa" ? "ارتفاع موج" : "Wave Height",
        key: "wave_height",
        unit: "m",
        },
        {
        label: language == "fa" ? "جهت موج" : "Wave Direction",
        key: "wave_direction",
        unit: "°",
        },
        {
        label: language == "fa" ? "ارتفاع سطح دریا" : "Sea Level Height",
        key: "sea_level_height_msl",
        unit: "m",
        },
        {
        label: language == "fa" ? "دمای سطح دریا" : "Sea Surface Temperature",
        key: "sea_surface_temperature",
        unit: "°C",
        },
        {
        label: language == "fa" ? "سرعت جریان اقیانوسی" : "Ocean Current Velocity",
        key: "ocean_current_velocity",
        unit: "m/s",
        },
        {
        label: language == "fa" ? "جهت جریان اقیانوسی" : "Ocean Current Direction",
        key: "ocean_current_direction",
        unit: "°",
        },
    ];
    const dailyItems = [
        {
        label: language == "fa" ? "حداکثر ارتفاع موج" : "Maximum Wave Height",
        key: "wave_height_max",
        unit: "m",
        },
        {
        label: language == "fa" ? "جهت غالب موج" : "Dominant Wave Direction",
        key: "wave_direction_dominant",
        unit: "°",
        },
        {
        label: language == "fa" ? "حداکثر دوره تناوب موج" : "Maximum Wave Period",
        key: "wave_period_max",
        unit: "s",
        },
    ];

    const renderValue = (value, unit) => {
        if (value === null || value === undefined) {
        return "—";
        }
        return `${value} ${unit}`.trim();
    };

    return (
        <section className="marine-weather">
        <div className="mw-container">
            {/* Current Marine Conditions */}
            <section className="mw-section">
            <h3>{t.ui.currentMarineConditions}</h3>
            <ul className="mw-current-grid" >
                {currentMarineData &&
                currentItems.map((item) => (
                    <li className="cmc-card glass" key={item.key} >
                        <h4>{item.label}:</h4>
                        <p>
                            {renderValue(
                            currentMarineData[item.key],
                            item.unit
                            )}
                        </p>
                    </li>
                ))}
            </ul>
            </section>

            {/* Hourly Marine Forecast */}
            <section className="mw-section">
            <h3>{t.ui.next24Hours}</h3>
            <Carousel className="marine-carousel">
                {hourlyMarineData?.map((data) => (
                <div className="mw-card glass" key={data.time}>
                    <h4>{data.time}</h4>

                    {hourlyItems.map((item) => (
                    <p key={item.key}>
                        <span>{item.label}</span>
                        <span>
                        {renderValue(data[item.key], item.unit)}
                        </span>
                    </p>
                    ))}
                </div>
                ))}
            </Carousel>
            </section>

            {/* Daily Marine Forecast */}
            <section className="mw-section">
            <h3>{t.ui.next7Days}</h3>
            <Carousel className="marine-carousel">
                {dailyMarineData?.map((data) => (
                <div className="mw-card glass" key={data.day}>
                    <h4>{data.day}</h4>

                    {dailyItems.map((item) => (
                    <p key={item.key}>
                        <span>{item.label}</span>
                        <span>
                        {renderValue(data[item.key], item.unit)}
                        </span>
                    </p>
                    ))}
                </div>
                ))}
            </Carousel>
            </section>
        </div>
        </section>
    );
}

export default MarineWeather;
