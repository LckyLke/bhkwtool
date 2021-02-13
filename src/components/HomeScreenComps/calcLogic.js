

const toMath = (calc) => {
    if (calc) {
    return parseFloat(calc)
    }
    return 0
} 

const zz = (typeg, elektrischeLeistung) => {
    if (typeg) {
        const netzCalc = (einspeisung, kw, kwdiff) => {
            if (elektrischeLeistung <= kw) {return 0}
            if (elektrischeLeistung > einspeisung) {
                return (kwdiff/elektrischeLeistung * einspeisung)
            }
            return ((elektrischeLeistung-100)/elektrischeLeistung * einspeisung)}

            const einspeisungArr = [
                elektrischeLeistung > 50 ? 0.08 : 0.16,
                0.06,
                0.05,
                0.044,
                0.31
            ]
            const summantenArr = [
                elektrischeLeistung > 50 ? (50/elektrischeLeistung * einspeisungArr[0]) : einspeisungArr[0],
                netzCalc(einspeisungArr[1], 50, 50),
                netzCalc(einspeisungArr[2], 100, 150),
                netzCalc(einspeisungArr[3], 250, 1750),
                elektrischeLeistung <= 2000 ? 0 : (elektrischeLeistung - 2000)/elektrischeLeistung * 10
            ]
            return (summantenArr.reduce((pv, cv) => pv + cv, 0))
        }
    
        const eigenverbrauchArr = [
            elektrischeLeistung > 50 ? 0.04 : 0.08,
            0.03,
            0,
            0,
            0
        ]
        
        const summmantenArr = [
            elektrischeLeistung > 100 ? 0 : (elektrischeLeistung > 50 ? 50/elektrischeLeistung * eigenverbrauchArr[0] : eigenverbrauchArr[0]),
            elektrischeLeistung > 100 ? 0 : (elektrischeLeistung <= 50 ? 0 : (elektrischeLeistung - 50)/elektrischeLeistung * eigenverbrauchArr[1]),
            0,
            0,
            0
        ]
        return(summmantenArr.reduce((pv, cv) => pv + cv, 0))

    }

const calcLogic = {
    summeReststrombezug: (gesamtbedarfStrom, erzeugteStrommengeImBHKW, entspricht) => {
        const a = toMath(gesamtbedarfStrom)
        const b = toMath(erzeugteStrommengeImBHKW)
        const c = toMath(entspricht)
        const checkVal = b - c
        return (checkVal > a ? 0 : Math.round(a - checkVal)) 
    },
    summeRestwärmeAusKessel: (wärmeproduktionBHKW, entsprichtEinemWärmebedarf) => {
        const a = toMath(wärmeproduktionBHKW)
        const b = toMath(entsprichtEinemWärmebedarf)
        if (a > b) {
            
            return 0
        }
        return (Math.round(b - a))
    },
    brennstoffeinsatzImKessel: (wärmeproduktionBHKW, entsprichtEinemWärmebedarf, jahresanlagennutzungsgradWärmeerzeuger) => {
        const a = toMath(wärmeproduktionBHKW)
        const b = toMath(entsprichtEinemWärmebedarf)
        const c = toMath(jahresanlagennutzungsgradWärmeerzeuger)

        if (a > b) {
            return 0
        }
        if (Math.round((b-a)*1.107/(c/100))) {
        return (Math.round((b-a)*1.107/(c/100)))
        }
        return 0
    },
    verbrauchteZuschlagsberechtigteBetriebsstunden: (elektrischeLeistung, davonInsNetzEingespeist, betriebsstundenBHKW, maximalZuschlagsberechtigteVollbenutzungsstunden, multiplikator) => {
        const a = toMath(elektrischeLeistung)
        const b = toMath(davonInsNetzEingespeist)
        const c = toMath(betriebsstundenBHKW)
        const d = toMath(maximalZuschlagsberechtigteVollbenutzungsstunden)
        
        if (a <= 100 && (c * multiplikator) < d) {
            return (c * multiplikator)
        }
        if (d > c * b/100 && a > 100) {
            return c*b/100
        }
        return d
    },
    preisteigungsFunktion: (basis, steigung, exponent) => {
        const a = toMath(basis)
        const b = toMath(steigung)
        const c = toMath(exponent)
        
        return Math.round(a * Math.pow((1 + b/100),c))  
    },
    EEGOutput: (EEGUmlage, erzeugteStrommengeImBHKW, entspricht, AnteilEEGUmlageEigenstrom) => {
        const a = toMath(EEGUmlage)
        const b = toMath(erzeugteStrommengeImBHKW)
        const c = toMath(entspricht)
        const d = toMath(AnteilEEGUmlageEigenstrom)

        return Math.round(a * 10 * d/100 * (b-c))
    },
    rmz: (ir, np, pv, fv, type) => {
        if (!(ir && np && pv)) {
            return 0
        }
        /*
         * ir   - interest rate per month
         * np   - number of periods (months)
         * pv   - present value
         * fv   - future value
         * type - when the payments are due:
         *        0: end of the period, e.g. end of month (default)
         *        1: beginning of period
         */
        let pmt, pvif;
    
        fv || (fv = 0);
        type || (type = 0);
    
        if (ir === 0)
            return -(pv + fv)/np;
    
        pvif = Math.pow(1 + ir, np);
        pmt = - ir * pv * (pvif + fv) / (pvif - 1);
    
        if (type === 1)
            pmt /= (1 + ir);
    
        return Math.round(pmt);
    },
    VollrevisionRechner: (kostenVollrevision, preissteigerungenWartungProA, betriebsstundenBHKW,exponent) => {
        const a = toMath(kostenVollrevision)
        const b = toMath(preissteigerungenWartungProA)
        
        const d = toMath(exponent)
        
       
        
        return Math.round(a * Math.pow((1 + b/100), d))
        
    },
    kwkBonus: (elektrischeLeistung, verbrauchteZuschlagsberechtigteBetriebsstunden, betriebsstundenBHKW, maximalZuschlagsberechtigteVollbenutzungsstunden, entspricht, erzeugteStrommengeImBHKW) => {
        const a = toMath(elektrischeLeistung)
        const b = toMath(verbrauchteZuschlagsberechtigteBetriebsstunden)
        const c = toMath(betriebsstundenBHKW)
        const d = toMath(maximalZuschlagsberechtigteVollbenutzungsstunden)
        const e = toMath(entspricht)
        const f = toMath(erzeugteStrommengeImBHKW)
        
        if (a > 100) {
            return (Math.round(b * a * zz(true, a)))
        }
        if (c > d) {
            
            return ( Math.round( ((-1) * (e * 1000 * zz(true, a) + (f - e)* 1000 * zz(false, a)) * (b/c) ) ))
        }
        return (Math.round( ((-1) * (e * 1000 * zz(true, a) + (f - e) * 1000 * zz(false, a))) ))
    },
    kwkSpecial: (prevVerbrauchteZuschlagsberechtigteBetriebsstunden, prevVerbrauchteZuschlagsberechtigteKummulierteBetriebsstunden, verbrauchteZuschlagsberechtigteKummulierteBetriebsstunden, prevKWK) => {
        const a = prevVerbrauchteZuschlagsberechtigteBetriebsstunden
        const b = prevVerbrauchteZuschlagsberechtigteKummulierteBetriebsstunden
        const c = verbrauchteZuschlagsberechtigteKummulierteBetriebsstunden
        const d = prevKWK

        if (c <= 30000) {
            return d
        }
        if (c > 30000 && c < 33500) {
            return (d/a * (30000-b)*1)
        }
        return 0
    },
    rückerstattungErdgassteuer: (brennstoffeinsatzImBHKWHs, erdgassteuerRückerstattung) => {
        const a = toMath(brennstoffeinsatzImBHKWHs)
        const b = toMath(erdgassteuerRückerstattung)

        return (Math.round(a * b * (-1)))
    },
    emissionenC7: (brennstoffeinsatzImKessel/*Daten!J30*/,brennstoffeinsatzImBHKWHs/*Daten!J26*/ ) => {
        const a = toMath(brennstoffeinsatzImKessel)
        const b = toMath(brennstoffeinsatzImBHKWHs)
        
        return( Math.round( ((a * 1000 + b * 1000) * 0.202)/1000) )
    },
    produktPreisteigerung: (GesamtbedarfErdgasFürHeizungUndWarmwasser, BasisgaspreisInklAllerAbgabenNetto, SteigerungErdgasProA, exponent) => {
        const a = toMath(GesamtbedarfErdgasFürHeizungUndWarmwasser)
        const b = toMath(BasisgaspreisInklAllerAbgabenNetto)
        const c = toMath(SteigerungErdgasProA)
        const d = toMath(exponent)

        return (Math.round( (a*b) * Math.pow((1 + c/100), d ) ))
    },
    emissionenB7: (GesamtbedarfErdgasFürHeizungUndWarmwasser/*D10*/) => {
        const a = toMath(GesamtbedarfErdgasFürHeizungUndWarmwasser)
        
        
        return( (((a * 1000) * 0.202)/1000 ) )
    },
    VollrevisionArrayCalc: (arr, bhkBetriebstundenarr) => {
        let currentMultiplier = 1
        let returnArr = []
       
        for (let i = 0; i < arr.length; i++) {
            
            if (bhkBetriebstundenarr[i] >= 30000 * currentMultiplier) {
                currentMultiplier++
                returnArr.push(Math.round(arr[i + 1]))
                continue
            }
            returnArr.push(0)
        }
        
        return returnArr    
    }
}

export default calcLogic