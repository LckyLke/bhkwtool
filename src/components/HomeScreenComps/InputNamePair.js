import React from "react"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import useStore from "../../store/useStore"

const elektrischeLeistungDropdown = [
    20,
    50,
    100,
    140,
    199,
    238,
]
const InputNamePair = props => {

    const state = useStore()
    const updateVal = useStore(state => state.updateValue)

    const dependableUnitRender = () => {
        return props.unit ? <div className="ml-2 text-sm font-bold self-center w-1/12 mr-1">{"["+props.unit+"]"}</div> : null}

    const inputChangeHandler = (e) => {
        
        if (e.target.value.replace(/,/g, '.').indexOf(".") !== -1) {
            if (e.target.value.replace(/,/g, '.').slice(-1) !== ".") {
                if (!isNaN(parseFloat(e.target.value.replace(/,/g, '.')))) {
                    updateVal(e.target.value.replace(/,/g, '.'), props.targetStateName)
                    return
                }
                updateVal("", props.targetStateName)
                return
            }
            if (!isNaN(parseFloat(e.target.value.replace(/,/g, '.').slice(0,-1)))) {
                updateVal(e.target.value.replace(/,/g, '.'), props.targetStateName)
                return
            }
            updateVal("", props.targetStateName)
        }
        if (!isNaN(parseFloat(e.target.value.replace(/,/g, '.')))) {
            updateVal(e.target.value.replace(/,/g, '.'), props.targetStateName)
            return
        }
        updateVal("", props.targetStateName)
    }
    
  
    const dependableInputOrDropdownRender = () => {
        if (props.dropdown) {
            return (
                
                <Dropdown className="z-auto w-4/12 px-1 self-center" options={elektrischeLeistungDropdown} onChange={(e) => updateVal(parseFloat(e.value), props.targetStateName)} value={state[props.targetStateName].toString()} />
     
            )
        }
        if (props.textinput) {
            return (
                <input spellCheck="false" value={state[props.targetStateName]} className="border-2 w-4/12 bg-yellow-100 text-right px-1 self-center" 
            onChange={(e) => {
                updateVal(e.target.value, props.targetStateName)
            }}/>
            )
        }
        return (
            <input spellCheck="false"  value={state[props.targetStateName]} className="border-2 w-4/12 bg-yellow-100 text-right px-1 self-center" 
            onChange={(e) => {
                inputChangeHandler(e)
            }}/>

        )
        
    }    

    return (
        <div className="flex justify-between w-full mt-1">
            <div className="text-sm text-left w-7/12 self-center">{props.name}</div>
            
            {dependableInputOrDropdownRender()}
            {dependableUnitRender()}
        </div>
    )
}

export default InputNamePair