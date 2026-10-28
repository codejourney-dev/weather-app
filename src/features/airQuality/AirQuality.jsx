import "./air-quality.css";
import Carousel from "../../components/ui/Carousel";
import { useLanguage } from "../../context/LanguageContext";
function AirQuality({currentQuality,hourlyQuality}){
    const qualityItems = [
      { label: "European AQI", value: currentQuality?.european_aqi, unit: "" },
      { label: "PM10", value: currentQuality?.pm10, unit: "µg/m³" },
      { label: "PM2.5", value: currentQuality?.pm2_5, unit: "µg/m³" },
      { label: "CO", value: currentQuality?.carbon_monoxide, unit: "µg/m³" },
      { label: "NO₂", value: currentQuality?.nitrogen_dioxide, unit: "µg/m³" },
      { label: "SO₂", value: currentQuality?.sulphur_dioxide, unit: "µg/m³" },
      { label: "O₃", value: currentQuality?.ozone, unit: "µg/m³" },
      { label: "Dust", value: currentQuality?.dust, unit: "µg/m³" },
      { label: "UV Index", value: currentQuality?.uv_index, unit: "" },
    ];
    const { t } = useLanguage();
    return(
        <section className="air-quality">
            <div className="aq-container">
                <h3 className="title">{t.ui.currentAirQuality}</h3>
                <ul>
                  {currentQuality &&
                    qualityItems.map((item) => (
                      <li className="glass" key={item.label}>
                        <h4>
                          {item.label}: {item.value ?? "—"} {item.unit}
                        </h4>
                      </li>
                    ))}
                </ul>
                <h3 className="title">{t.ui.airQualityForecast}</h3>
                <Carousel className={"air-carousel"}>
                  {hourlyQuality && hourlyQuality.map((data, index)=>(
                    <div key={index} className="aq-card glass" dir="ltr">
                      <span className="aq-time">{data.time}</span>
                      European AQI: {data.european_aqi}
                      <br />
                      PM10: {data.pm10}
                      <br />
                      PM2.5: {data.pm2_5}
                      <br />
                      CO: {data.carbon_monoxide}
                      <br />
                      NO₂: {data.nitrogen_dioxide}
                      <br />
                      SO₂: {data.sulphur_dioxide}
                      <br />
                      O₃: {data.ozone}
                      <br />
                      Dust: {data.dust}
                      <br />
                      UV Index: {data.uv_index}
                    </div>
                  ))}
                </Carousel>
            </div>
        </section>
    );
}
export default AirQuality;