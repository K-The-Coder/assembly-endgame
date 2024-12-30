import React from "react"

export default function FarewellText({message}){
    return(
        <>
            <p className="farewell-message">
                {message}
            </p>
        </>
    )
}