import React from "react"

export default function Status({status, message}){
    return(
        <>
            <h2>{status}</h2>
            <p>{message}</p>
        </>
    )
}