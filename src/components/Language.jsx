import React from "react"

export default function Language({name, backgroundColor, color, className}){
    return(
        <>
            <span className={className} style={{backgroundColor: backgroundColor, color: color}}>
                {name}
            </span>
        </>
    )
}