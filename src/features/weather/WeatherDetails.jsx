import {convertPressure, convertTemperature, convertWindSpeed, formatValue} from "../../utils/units";
function WeatherDetails({weatherDetails, units}){
    return(
        <section className="weather-details">
            <div className="wd-container">
                <ul>
                  {weatherDetails && (
                    <>
                      <li className='card'>
                        <h4>
                          feelsLike: {
                            formatValue(
                              convertTemperature(
                                weatherDetails.feelsLike,
                                units.temperature
                              )
                            )
                          }°
                          {units.temperature === "celsius" ? "C" : "F"}
                        </h4>
                      </li>
                      {/* {weatherData && (
                            ()
                        )} 
                         */}
                      <li className='card'>
                        <h4>surfacePressure: 
                          {formatValue(
                            convertPressure(
                              weatherDetails.surfacePressure,
                              units.pressure
                            )
                          )}
                          {units.pressure === "mmhg"
                            ? " mmhg"
                            : units.pressure === "inhg"
                            ? " inhg"
                            : units.pressure === "hpa"
                            ? " hpa"
                            : " mph"
                          }
                        </h4>
                      </li>
                      <li className='card'>
                        <h4>humidity: {weatherDetails.humidity}%</h4>
                      </li>
                      <li className='card'>
                        <h4>dewPoint: 
                          {
                            formatValue(
                              convertTemperature(
                                weatherDetails.dewPoint,
                                units.temperature
                              )
                            )
                          }°
                          {units.temperature === "celsius" ? "C" : "F"}
                        </h4>
                      </li>
                      <li className='card'>
                        <h4>precipitationProbability: {weatherDetails.precipitationProbability}</h4>
                      </li>
                      <li className='card'>
                        <h4>precipitation: {weatherDetails.precipitation}</h4>
                      </li>
                      <li className='card'>
                        <h4>cloudCover: {weatherDetails.cloudCover}</h4>
                      </li>
                      <li className='card'>
                        <h4>visibility: {(weatherDetails.visibility)/1000}km/h</h4>
                      </li>
                      <li className='card'>
                        <h4>soilTemperature: 
                          {
                            formatValue(
                              convertTemperature(
                                weatherDetails.soilTemperature,
                                units.temperature
                              )
                            )
                          }°
                          {units.temperature === "celsius" ? "C" : "F"}
                        </h4>
                      </li>
                      <li className='card'>
                        <h4>soilMoisture: {weatherDetails.soilMoisture}%</h4>
                      </li>
                      <li className='card'>
                        <h4>
                          windSpeed:
                          {formatValue(convertWindSpeed(
                            weatherDetails.windSpeed,
                            units.windSpeed
                          ))}
                          {units.windSpeed === "kmh"
                              ? " km/h"
                              : units.windSpeed === "ms"
                              ? " m/s"
                              : " mph"
                          }
                        </h4>
                      </li>
                       <li className='card'>
                        <h4>windDirection: {weatherDetails.windDirection}°</h4>
                      </li>
                    </>
                  )}
                </ul>
            </div>
        </section>
    )
}
export default WeatherDetails;