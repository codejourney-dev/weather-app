import { useState, useEffect } from "react";
import AirQuality from "./AirQuality";
import { fetchOpenMeteoAir } from "../../services/AirQuality";
import { useLanguage } from "../../context/LanguageContext"


function AirWarp({activeCity}){
    const [airQuality, setAirQuality] = useState(null);
    const [currentQuality, setCurrentQuality] = useState(null);
    const [hourlyQuality, setHourlyQuality] = useState(null);
    const { language } = useLanguage();
    
    // fetching air quality raw data
    useEffect(()=>{
        if (!activeCity) return undefined;

        const city = activeCity;
        const controller = new AbortController();
        setAirQuality(null);

        const fetchAirData = async () => {
            try {
                const airJson = await fetchOpenMeteoAir({
                    latitude: city.latitude,
                    longitude: city.longitude,
                    signal: controller.signal,
                })
                setAirQuality({ ...airJson, location: city });
                
            } catch (error) {
                if (error.name === "AbortError") return;

                console.error("Air Quality API request failed:", error);
                setAirQuality(null);
            }
        }
        fetchAirData();
        return () => {
            controller.abort();
        };
    },[activeCity])
    //transform & store Air data
    useEffect(()=>{
        if (!airQuality?.location || !airQuality.current || !airQuality.hourly) {
            setCurrentQuality(null);
            setHourlyQuality(null);
            return;
        }
        const {location, current, hourly} = airQuality;

        const currentHour = current.time?.slice(0, 13);
        const hourlyTimes = hourly.time ?? [];
        let startIndex = hourlyTimes.findIndex((time) => time.slice(0, 13) === currentHour);
        // Fall back to the first future hour if the current hour is absent from the hourly array.
        if (startIndex < 0) {
            startIndex = hourlyTimes.findIndex((time) => time >= currentHour);
        }
        if (startIndex < 0 && hourlyTimes.length > 0) startIndex = hourlyTimes.length - 1;

        const currentAir = {
            city: location.name,
            country: location.country,
            european_aqi: current.european_aqi,
            pm10: current.pm10,
            pm2_5: current.pm2_5,
            carbon_monoxide: current.carbon_monoxide,
            nitrogen_dioxide: current.nitrogen_dioxide,
            sulphur_dioxide: current.sulphur_dioxide,
            ozone: current.ozone,
            dust: current.dust,
            uv_index: current.uv_index,
        }
        setCurrentQuality(currentAir);
        
        const hourlyAir = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => {
            const actualIndex = startIndex + index;
            return {
                time: time.slice(0, 13) === currentHour
                    ? (language === "en" ? "now" : "اکنون") 
                    : new Date(`${time}:00`).toLocaleTimeString(undefined, {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                timestamp: time,
                european_aqi: hourly.european_aqi?.[actualIndex],
                pm10: hourly.pm10?.[actualIndex],
                pm2_5: hourly.pm2_5?.[actualIndex],
                carbon_monoxide: hourly.carbon_monoxide?.[actualIndex],
                nitrogen_dioxide: hourly.nitrogen_dioxide?.[actualIndex],
                sulphur_dioxide: hourly.sulphur_dioxide?.[actualIndex],
                ozone: hourly.ozone?.[actualIndex],
                dust: hourly.dust?.[actualIndex],
                uv_index: hourly.uv_index?.[actualIndex],
            };
        });
        setHourlyQuality(hourlyAir);
    },[airQuality,setCurrentQuality, setHourlyQuality, language])
    return(
        <>
            <AirQuality 
                currentQuality={currentQuality}
                hourlyQuality={hourlyQuality}
            />
        </>
    );
}
export default AirWarp;