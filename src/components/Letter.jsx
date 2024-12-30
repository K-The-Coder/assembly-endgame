import React from "react"

export default function Letter({char, className}){
    return(
        <>
            <span className={className}>
                {char}
            </span>
        </>
    )
}