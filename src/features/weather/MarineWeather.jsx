function MarineWeather(){
    return(
        <section className="marine-weather">
            <div className="mw-container">
                <div className="mw-title">
                    <h2>Marine Weather</h2>
                </div>
                <ul>
                    <li className='card'>
                        <h4>Wave height: 1.4m</h4>
                    </li>
                    <li className='card'>
                        <h4>Wave direction: 310°</h4>
                    </li>
                    <li className='card'>
                        <h4>Sea surface temperature: 25°C</h4>
                    </li>
                    <li className='card'>
                        <h4>Wave Period: </h4>
                    </li>
                    <li className='card'>
                        <h4>Wind Wave Height: 2m</h4>
                    </li>
                    <li className='card'>
                        <h4>Wind Wave Direction: 310°</h4>
                    </li>
                </ul>
            </div>
        </section>
    )
}
export default MarineWeather;