import React from "react"

const InfoHeader = props => {
    return (
        <h2 className="underline">
            {props.children}
        </h2>
    )
}

export default InfoHeader