function Card(){
    return(
        <div className="hf-card card">
          <p className="hour">00:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">19</h3>
          <p className="humidity">38%</p>
          <p className="wind-speed">2.7 km/h</p>
        </div>
    )
}

export default Card; 