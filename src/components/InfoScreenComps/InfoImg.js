import React from "react"

const InfoImg = props => {
    return (
        <img src={props.src} alt={props.alt} className={" shadow-md place-self-center " + props.width} />
            
    )
}

export default InfoImg