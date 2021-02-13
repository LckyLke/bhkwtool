import React from "react"

//this componentent seperates the input and outputs between the left and right side

const InputSeperator = props => {
    return (
        <div className="w-1/2 border-2 px-1 pb-1 mr-1 overflow-hidden">
            {props.children}
        </div>
    )
}

export default InputSeperator