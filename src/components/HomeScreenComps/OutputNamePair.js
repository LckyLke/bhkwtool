import React from "react"



const OutputNamePair = props => {
    const dependableUnitRender = () => {
       
        return props.unit ? <div className="ml-2 text-sm font-bold self-center w-1/12 mr-1">{"["+props.unit+"]"}</div> : null}


    return (
        <div className="flex justify-between w-full mt-1">
            <div className="text-sm text-left w-7/12 self-center text-blue-900">{props.name}</div>
            <div className="border-2 w-4/12 bg-green-100 text-right px-1 self-center">{props.value}</div>
            
            {dependableUnitRender()}
        </div>
    )
}

export default OutputNamePair