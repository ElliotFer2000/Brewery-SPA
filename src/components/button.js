import React from "react"

function Button({onClick,classes,text,iconName,id}) {
   
    return (
        <button data-page={id} className={`btn waves-effect waves-light ${classes}`} onClick={onClick}>
            <span className={iconName ? `material-icons` : ``} data-page={id}>{ iconName ? iconName : text}</span>
        </button>
    )
}

export default Button