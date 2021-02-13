const convertLogic = {
    stateToFloat: (state) => {
        let returnState = {

        }
        for (const prop in state) {
            if (state[prop] && !isNaN(parseFloat(state[prop]))) {
                returnState[prop] = parseFloat(state[prop])
                continue    
            }
            returnState[prop] = 0
        }
        return returnState
    }
}

export default convertLogic