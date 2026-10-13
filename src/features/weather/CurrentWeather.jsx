import {Droplets,Wind,Sun,ArrowUpDown } from 'lucide-react';
function CurrentWeather(){
    return(
        <section className="hero">
            <div className="current-temperature">
                <h1>18°C</h1>
            </div>
            <div className="current-details">
                <div className="condition"><p><Sun />sunny</p></div>
                <div className="minmax-temp"><p><ArrowUpDown />24/16°C</p></div>
                <div className="humidity"><p><Droplets />38%</p></div>
                <div className="wind"><p><Wind />2.7km/h</p></div>
            </div>
        </section>
    )
}
export default CurrentWeather;