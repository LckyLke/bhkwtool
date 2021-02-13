import React from "react"


//takes the input seperators and gives the header
const InputShell = props => {
    const conditional2or1nameRender = () => {
        if (props.header) {
            return (
                <span className="text-left">{props.header}</span>
            )
        }
            return (
                <div className="w-full flex justify-between"><span className="w-1/2 text-left">{props.headerLeft}</span><span className="w-1/2 text-left">{props.headerRight}</span></div>
            )
        
    }

    return (
        <div className="w-full flex flex-col py-1 pl-1 mt-2 shadow-md border-2 rounded-md border-black">
            {conditional2or1nameRender()}
            <div className="justify-between flex">
                {props.children}
            </div>
        </div>
    )
}

export default InputShell