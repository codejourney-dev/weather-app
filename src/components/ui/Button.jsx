function Button(className, content){
    return(
        <button className={`card ${className}`}>
            <p>{content}</p>
        </button>
    )
}

export default Button;