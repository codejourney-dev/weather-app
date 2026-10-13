import {MapPin,Settings} from 'lucide-react';

function Navigation({activeCity}){
    function toggleMenu(){
        const menu1 = document.querySelector('.menu');
        const container = document.querySelector('.app-container');
        const menu2 = document.querySelector('.location-mgt');
        
        menu1.classList.toggle('is-open');
        container.classList.toggle('is-open');
        menu2.classList.toggle('is-open');
    }
    function toggleSetting(){
        const container = document.querySelector('.app-container');
        const settingMenu = document.querySelector('.setting-menu');
        const settingBtn = document.querySelector('.setting');
        
        container.classList.toggle('setting-open');
        settingMenu.classList.toggle('setting-open');
        settingBtn.classList.toggle('setting-open');
    }
    return(
        <nav className="navbar">
          <div className="setting-btn">
            <button className='setting' onClick={toggleSetting} >
              <Settings size={32}  strokeWidth={2}/>
            </button>
          </div>
          <div className="current-location">
            <h1><MapPin size={26}/>{activeCity.name}</h1>
          </div>
          <div className="menu-btn">
            <button 
              className='menu'
              type="button"
              onClick={toggleMenu}
            >
              <span className='line line-1'></span>
              <span className='line line-2'></span>
              <span className='line line-3'></span>
            </button>
          </div>
        </nav>
    )
};

export default Navigation;