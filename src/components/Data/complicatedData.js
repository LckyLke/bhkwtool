import calcLogic from "../HomeScreenComps/calcLogic"



const checkIfValid = (calc) => {
    if (parseFloat(calc)) {
        return parseFloat(calc)
    }
    return 0
}





const complicatedData = (toAccsess, state) => {
    const dataObject = {
        VollrevisionDaten: calcLogic.VollrevisionArrayCalc([
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 1), 0),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 2), 1),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 3), 2),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 4), 3),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 5), 4),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 6), 5),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 7), 6),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 8), 7),
            calcLogic.VollrevisionRechner(state.KostenVollrevision, state.PreissteigerungenWartungProA, checkIfValid(state.BetriebsstundenBHKW * 9), 8),
        ], [
            checkIfValid(state.BetriebsstundenBHKW * 1),
            checkIfValid(state.BetriebsstundenBHKW * 2),
            checkIfValid(state.BetriebsstundenBHKW * 3),
            checkIfValid(state.BetriebsstundenBHKW * 4),
            checkIfValid(state.BetriebsstundenBHKW * 5),
            checkIfValid(state.BetriebsstundenBHKW * 6),
            checkIfValid(state.BetriebsstundenBHKW * 7),
            checkIfValid(state.BetriebsstundenBHKW * 8),
            checkIfValid(state.BetriebsstundenBHKW * 9),
        ])
    }

    return dataObject[toAccsess]
}
   


export default complicatedData

