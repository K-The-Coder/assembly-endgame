import React from "react"

export default function QwertyLetter({letter, onClick, className, disabled, ariaDisabled, ariaLabel}){
    return(
        <>
            <button 
                className={className} 
                onClick={onClick} 
                disabled={disabled}
                aria-disabled={ariaDisabled}
                aria-label={ariaLabel}
            >{letter}</button>
        </>
    )
}