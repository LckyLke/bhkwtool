import React from "react"

const InfoContainer = props => {
    return (
        <div className="flex flex-col align-middle justify-center p-2 mx-4 rounded-md shadow-md bg-gray-800 text-gray-200 mt-20 mb-2">
            {props.children}
        </div>
    )
}

export default InfoContainer