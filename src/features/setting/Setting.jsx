function Setting(){
    return(
        <section className="setting-menu">
          <div className="header">
            <h2>Setting</h2>
          </div>
          <div className="contain">
            <div className="change-lang">
              <div className="head">
                <h4>Language Selection</h4>
              </div>
              <div>
                <input type="radio" id="eng" name="language" value="english" checked />
                <label htmlFor="eng">English</label>
              </div>
              <div>
                <input type="radio" id="per" name="language" value="persian" />
                <label htmlFor="per">فارسی</label>
              </div>
            </div>
            <div className="change-units">
              <div className="head"><h3>Change Units</h3></div>
              <div className="change-temp">
                <div className="head"><h4>Change Temperature</h4></div>
                <div>
                  <input type="radio" id="cel" name="temperature-unit" value="celsius" checked/>
                  <label htmlFor="cel">Celsius</label>
                </div>
                <div>
                  <input type="radio" id="rah" name="temperature-unit" value="Fahrenheit" />
                  <label htmlFor="rah">Fahrenheit</label>
                </div>
              </div>
              <div className="change-speed">
                <div className="head"><h4>Change Speed</h4></div>
                <div>
                  <input type="radio" id="metric" name="speed-unit" value="Metric" checked/>
                  <label htmlFor="metric">Kilometers per hour</label>
                </div>
                <div>
                  <input type="radio" id="imperial" name="speed-unit" value="Imperial" />
                  <label htmlFor="imperial">Miles per hour</label>
                </div>
              </div>
            </div>
            <button className='card'>Apply</button>
          </div>
        </section>
    )
}

export default Setting;