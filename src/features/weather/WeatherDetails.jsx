function WeatherDetails(){
    return(
        <section className="weather-details">
            <div className="wd-container">
                <div className="wd-title">
                    <h2>Weather Details</h2>
                </div>
                <ul>
                  <li className='card'>
                    <h4>Precipitation probability: 37%</h4>
                  </li>
                  <li className='card'>
                    <h4>Dew point: 4°C</h4>
                  </li>
                  <li className='card'>
                    <h4>Air pressure: 1015.2 hPa</h4>
                  </li>
                  <li className='card'>
                    <h4>Cloud Cover: 25%</h4>
                  </li>
                  <li className='card'>
                    <h4>Visibility: 2000 m</h4>
                  </li>
                  <li className='card'>
                    <h4>Wind direction: 275°</h4>
                  </li>
                  <li className='card'>
                    <h4>UV index: 0</h4>
                  </li>
                </ul>
            </div>
        </section>
    )
}
export default WeatherDetails;