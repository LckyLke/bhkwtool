import React from "react"

const OutputField = props => {
    
    return (
        <div onClick={props.clickRegistered} className={(props.nameField ? "w-3/12 border-l-2 border-t-2 pr-1" : "w-1/12 border-l-2 border-t-2 pr-1") + " text-right text-sm align-middle flex flex-col justify-center "+ (props.bold ? "font-bold " : "") + props.passClass + " " + props.bgColor} ><span>{props.value}</span></div>    
    )
}

export default OutputField