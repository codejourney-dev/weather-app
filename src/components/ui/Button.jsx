function Button(Settings, toggleSetting){
    return(
        <button className='setting' onClick={toggleSetting} >
            <Settings size={32}  strokeWidth={2}/>
        </button>
    )
}

export default Button;