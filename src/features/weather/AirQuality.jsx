function AirQuality(){
    return(
        <section className="air-quality">
            <div className="aq-container">
                <div className="aq-title">
                  <h2>Air Quality</h2>
                </div>
                <ul>
                  <li className='card'>
                    <h4>AQI: 35</h4>
                  </li>
                  <li className='card'>
                    <h4>PM2.5: 21</h4>
                  </li>
                  <li className='card'>
                    <h4>Carbon monoxide: 13</h4>
                  </li>
                  <li className='card'>
                    <h4>Nitrogen dioxide: 21</h4>
                  </li>
                  <li className='card'>
                    <h4>Dust: 37</h4>
                  </li>
                </ul>
            </div>
        </section>
    );
}
export default AirQuality;