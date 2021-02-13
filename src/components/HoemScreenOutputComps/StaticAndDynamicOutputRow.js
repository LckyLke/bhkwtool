import React from "react"
import OutputField from "./OutputField"


const StaticAndDynamicOutputRow = props => {
    const checkIfHighlited = () => {
        if (props.highlitedRow === props.rowName) {
            return " bg-yellow-300"
        }
        return ""
    }

    const onClickHighlite = () => {
        if (props.highlitedRow === props.rowName) {
            props.setHighlitedRow("")
            return
        }
        if (props.setHighlitedRow) {
        props.setHighlitedRow(props.rowName)
        }
    }

    const setHighlitedCol = (col) => {
        if (props.setHighlitedCol) {
            
            if (props.highlitedCol === col) {  
                
                props.setHighlitedCol(null)
                return
            }
            
            props.setHighlitedCol(col)
        }
    }

    const checkHighlitedCol = (col) => {
        if (col === props.highlitedCol) {
            return "bg-green-300 "
        }
        return ""
    }

    return (
        
        <div className={"flex " + checkIfHighlited()} onClick={
            onClickHighlite
        }>
            <OutputField bgColor={props.bgColor} bold={props.bold} nameField={true} value={props.rowName}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2021)} bgColor={checkHighlitedCol(2021) + props.bgColor} bold={props.bold} value={props.valueArray[0]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2022)} bgColor={checkHighlitedCol(2022) + props.bgColor} bold={props.bold} value={props.valueArray[1]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2023)} bgColor={checkHighlitedCol(2023) + props.bgColor} bold={props.bold} value={props.valueArray[2]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2024)} bgColor={checkHighlitedCol(2024) + props.bgColor} bold={props.bold} value={props.valueArray[3]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2025)} bgColor={checkHighlitedCol(2025) + props.bgColor} bold={props.bold} value={props.valueArray[4]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2026)} bgColor={checkHighlitedCol(2026) + props.bgColor} bold={props.bold} value={props.valueArray[5]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2027)} bgColor={checkHighlitedCol(2027) + props.bgColor} bold={props.bold} value={props.valueArray[6]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2028)} bgColor={checkHighlitedCol(2028) + props.bgColor} bold={props.bold} value={props.valueArray[7]}/>
            <OutputField  clickRegistered={() => setHighlitedCol(2029)} bgColor={checkHighlitedCol(2029) + props.bgColor + " border-r-2"} bold={props.bold} value={props.valueArray[8]}/>
        </div>
        
    )
}

export default StaticAndDynamicOutputRow