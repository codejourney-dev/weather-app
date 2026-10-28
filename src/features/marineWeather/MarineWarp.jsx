import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarineWeather from "./MarineWeather";
import { fetchOpenMeteoMarine } from "../../services/MarineForecast";
import { useLanguage } from "../../context/LanguageContext"

function MarineWarp({ activeCity, setCoastalCity }){

    const [coastalData, setCoastalData] = useState(null);
    const [currentMarineData, setCurrentMarineData] = useState(null);
    const [hourlyMarineData, setHourlyMarineData] = useState(null);
    const [dailyMarineData, setDailyMarineData] = useState(null);
    const { language } = useLanguage();

    const location = useLocation();
    const navigate = useNavigate();
    const showWeather = location.pathname === "/marineWeather";

    //is costal city, fetching data
    useEffect(() => {
        let cancelled = false;
        const controller = new AbortController();

        async function loadMarineData() {
            setCoastalData(null);
            setCurrentMarineData(null);
            setHourlyMarineData(null);
            setDailyMarineData(null);
            setCoastalCity(null);
            if (!activeCity) return;
            try {
                const payload = await fetchOpenMeteoMarine({
                    latitude: activeCity.latitude,
                    longitude: activeCity.longitude,
                    signal: controller.signal,
                });
                if (cancelled) return;
                const data = {
                    ...payload,
                    location: activeCity,
                };
                setCoastalData(data);
                setCoastalCity(activeCity);
            } catch (error) {
                if (error.name === "AbortError") return;
                console.error("Marine data error:", error);
                if (!cancelled) {
                    setCoastalCity(null);
                    setCoastalData(null);
                    if (showWeather === "/marineWeather") {
                        navigate("/", { replace: true });
                    }
                }
            }
        }
        loadMarineData();

        return () => {
        cancelled = true;
        controller.abort();
        };
    }, [activeCity, setCoastalCity, setCoastalData,setCurrentMarineData,setHourlyMarineData,setDailyMarineData,showWeather,navigate]);
    
    useEffect(()=>{
        if(!showWeather || !coastalData){
            setCurrentMarineData(null);
            setHourlyMarineData(null);
            setDailyMarineData(null);
            return;
        };

        const {location, current, hourly, daily} = coastalData;
        const currentHour = current.time?.slice(0, 13);
        const hourlyTimes = hourly.time ?? [];
        let startIndex = hourlyTimes.findIndex((time) => time.slice(0, 13) === currentHour);
        // Fall back to the first future hour if the current hour is absent from the hourly array.
        if (startIndex < 0) {
            startIndex = hourlyTimes.findIndex((time) => time >= currentHour);
        }
        if (startIndex < 0 && hourlyTimes.length > 0) startIndex = hourlyTimes.length - 1;

        const currentMarine ={
            city: location.name,
            country: location.country,
            wave_height: current.wave_height,
            wave_direction: current.wave_direction,
            wave_period: current.wave_period,
            sea_surface_temperature: current.sea_surface_temperature,
            ocean_current_velocity: current.ocean_current_velocity,
            ocean_current_direction: current.ocean_current_direction,
        }
        setCurrentMarineData(currentMarine);
        
        const hourlyMarine = hourly.time.slice(startIndex, startIndex + 24).map((time, index)=>{
            const actualIndex = startIndex + index;
            return{
                time: time.slice(0, 13) === currentHour
                    ? (language === "en" ? "now" : "اکنون") :
                        new Date(time).toLocaleTimeString(undefined, {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                }),
            wave_height: hourly.wave_height[actualIndex],
            wave_direction: hourly.wave_direction[actualIndex],
            wave_period: hourly.wave_period[actualIndex],
            sea_level_height_msl: hourly.sea_level_height_msl[actualIndex],
            sea_surface_temperature: hourly.sea_surface_temperature[actualIndex],
            ocean_current_velocity: hourly.ocean_current_velocity[actualIndex],
            ocean_current_direction: hourly.ocean_current_direction[actualIndex],
            }
        });
        setHourlyMarineData(hourlyMarine);

        const dailyMarine = daily.time.slice(1,7).map((date, index)=>({
            day: new Date(date).toLocaleDateString(undefined, {weekday: "long"}),
            wave_height_max: daily.wave_height_max[index],
            wave_direction_dominant: daily.wave_direction_dominant[index],
            wave_period_max: daily.wave_period_max[index],
        }));
        setDailyMarineData(dailyMarine);

    }, [coastalData,setCurrentMarineData,setHourlyMarineData,setDailyMarineData,showWeather, language]);
    if (!showWeather || !coastalData) {
        return null;
    }
    return(
        <>
            <MarineWeather
                currentMarineData={currentMarineData}
                hourlyMarineData={hourlyMarineData}
                dailyMarineData={dailyMarineData}
            />
        </>
    );
}
export default MarineWarp;