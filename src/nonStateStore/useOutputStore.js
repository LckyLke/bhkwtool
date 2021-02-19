
//Not a State Object --- normal js object!!!

const nonStateOutputStore = {
    entsprichtEinemWärmebedarf: 0,
    entsprichtEinemWärmepreis: 0,
    stromInklAllerAbgabenInCt: 0,
    stromInklAllerAbgabenInEuro: 0,
    thermischeLeistung: 0,
    brennstoffleistungHi: 0,
    brennstoffleistungHs: 0,
    erzeugteStrommengeImBHKW: 0,
    entspricht: 0,
    wärmeproduktionBHKW: 0,
    brennstoffeinsatzImBHKWHi: 0,
    brennstoffeinsatzImBHKWHs: 0,
    summeRestrombezug: 0,
    summeRestwärmeAusKessel: 0,
    brennstoffeinsatzImKesselHs: 0,
    //Richtig unnötig eigentlich
    updateValue: (value, target) => {nonStateOutputStore[target] = value},
}

export default nonStateOutputStore