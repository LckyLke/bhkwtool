import React from "react"
import InputShell from "./InputShell";
import InputNamePair from "./InputNamePair"
import InputSeperator from "./InputSeperator"
import SubHeader from "./SubHeader"
import OutputNamePair from "./OutputNamePair"
import useStore from "../../store/useStore"
import calcLogic from "./calcLogic"
import convertLogic from "./convertLogic"
import nonStateOutputStore from "../../nonStateStore/useOutputStore"

//Verweis Store import
import useVerweiseStore from "../../store/useVerweiseStore" 

import FinalOutputSection from "../HoemScreenOutputComps/FinalOutputSection"



const MainHomeScreen = props => {

    
    const state = convertLogic.stateToFloat(useStore())
    const bhkwState = useVerweiseStore(state => state.BHKWStromKW)

   
    const checkIfDefined = (calculation, doRound) => {
        return  ((calculation) ? (doRound ? Math.round((calculation)) : (Math.round((calculation) *100))/100) : "0").toString()
    } 

   const updateOutputOnRerender = () => {
        //entspricht einem Wärmebedarf
        nonStateOutputStore.updateValue(checkIfDefined(state.GesamtbedarfErdgasFürHeizungUndWarmwasser/(1.107/state.JahresanlagennutzungsgradWärmeerzeuger * 100), true),"entsprichtEinemWärmebedarf")
        //entspricht einem Wärmepreis
        nonStateOutputStore.updateValue(checkIfDefined(state.BasisgaspreisInklAllerAbgabenNetto*1.107/state.JahresanlagennutzungsgradWärmeerzeuger*100),"entsprichtEinemWärmepreis")
        //Strompreis inkl. aller Abgaben in Ct pro kWh
        nonStateOutputStore.updateValue(checkIfDefined(state.DurchschnittspreisBezug + state.Stromsteuer + state.EEGUmlage + state.KWKAufschlagCa + state.SonstigeAbgaben),"stromInklAllerAbgabenInCt")
        //Strompreis inkl. aller Abgaben in Euro pro  MWh
        nonStateOutputStore.updateValue(checkIfDefined((state.DurchschnittspreisBezug + state.Stromsteuer + state.EEGUmlage + state.KWKAufschlagCa + state.SonstigeAbgaben) * 10),"stromInklAllerAbgabenInEuro")
        //Thermische Leistung
        nonStateOutputStore.updateValue(bhkwState[state.elektrischeLeistung].thermischeLeistung,"thermischeLeistung")
        //Brennstoffleistung Hi
        nonStateOutputStore.updateValue(bhkwState[state.elektrischeLeistung].brennstoffleistungKWHi,"brennstoffleistungHi")
        //Brennstoffleistung Hs
        nonStateOutputStore.updateValue(checkIfDefined(bhkwState[state.elektrischeLeistung].brennstoffleistungKWHi * 1.107, true),"brennstoffleistungHs")
        //erzeugte Strommenge im BHKW
        nonStateOutputStore.updateValue(checkIfDefined(state.elektrischeLeistung*state.BetriebsstundenBHKW/1000),"erzeugteStrommengeImBHKW")
        //entspricht
        nonStateOutputStore.updateValue(checkIfDefined((state.elektrischeLeistung*state.BetriebsstundenBHKW/1000) * state.DavonInsNetzEingespeist/100),"entspricht")
        //Wärmeproduktion BHKW
        nonStateOutputStore.updateValue(checkIfDefined(bhkwState[state.elektrischeLeistung].thermischeLeistung*state.BetriebsstundenBHKW/1000),"wärmeproduktionBHKW")
        //Brennstoffeinsatz im BHKW Hi
        nonStateOutputStore.updateValue(checkIfDefined(bhkwState[state.elektrischeLeistung].brennstoffleistungKWHi * state.BetriebsstundenBHKW/1000),"brennstoffeinsatzImBHKWHi")
        //Brennstoffeinsatz im BHKW Hs
        nonStateOutputStore.updateValue(checkIfDefined(bhkwState[state.elektrischeLeistung].brennstoffleistungKWHi * state.BetriebsstundenBHKW/1000 * 1.107, true),"brennstoffeinsatzImBHKWHs")
        //Summe Reststrombezug
        nonStateOutputStore.updateValue(calcLogic.summeReststrombezug(state.GesamtbedarfStrom, checkIfDefined(state.elektrischeLeistung*state.BetriebsstundenBHKW/1000), checkIfDefined((state.elektrischeLeistung*state.BetriebsstundenBHKW/1000) * state.DavonInsNetzEingespeist/100)),"summeRestrombezug")
        //Summe Restwärme aus Kessel
        nonStateOutputStore.updateValue(calcLogic.summeRestwärmeAusKessel(checkIfDefined(bhkwState[state.elektrischeLeistung].thermischeLeistung*state.BetriebsstundenBHKW/1000), checkIfDefined(state.GesamtbedarfErdgasFürHeizungUndWarmwasser/(1.107/state.JahresanlagennutzungsgradWärmeerzeuger * 100))),"summeRestwärmeAusKessel")
        //Brennstoffeinsatz im Kessel Hs
        nonStateOutputStore.updateValue(calcLogic.brennstoffeinsatzImKessel(checkIfDefined(bhkwState[state.elektrischeLeistung].thermischeLeistung*state.BetriebsstundenBHKW/1000), checkIfDefined(state.GesamtbedarfErdgasFürHeizungUndWarmwasser/(1.107/state.JahresanlagennutzungsgradWärmeerzeuger * 100)), state.JahresanlagennutzungsgradWärmeerzeuger),"brennstoffeinsatzImKesselHs")
   }

        
   updateOutputOnRerender()
    
    return (
        <div className="mx-2 mb-2 mt-20">

            {/*Kunde/Bearbeiter section*/}

            <InputShell header="Kunde/Bearbeiter">
                {/*left side*/}
                <InputSeperator>
                    <InputNamePair textinput={true} name="Projekt:" targetStateName="Projekt"/>
                    <InputNamePair textinput={true} name="Straße:"  targetStateName="Straße"/>
                    <InputNamePair textinput={true} name="PLZ/Ort:" targetStateName="PLZ"/>
                </InputSeperator>
                {/*right side*/}
                <InputSeperator>
                    <InputNamePair textinput={true} name="AP Kunde:"  targetStateName="APKunde"/>
                    <InputNamePair textinput={true} name="Bearbeiter:"  targetStateName="Bearbeiter"/>
                    <InputNamePair textinput={true} name="Datum:"  targetStateName="Datum"/>
                </InputSeperator>
            </InputShell>

            {/*Rahmendaten bestand Section*/}
             <InputShell header="Rahmendaten Bestand">
                {/*left side*/} 
                <InputSeperator>
                    <SubHeader subHeader="Gas"/>
                    <InputNamePair  targetStateName="GesamtbedarfErdgasFürHeizungUndWarmwasser" name="Gesamtbedarf Erdgas für Heizung und Warmwasser:" unit="MWh/a"/>
                    <InputNamePair  targetStateName="BasisgaspreisInklAllerAbgabenNetto" name="Basisgaspreis inkl. aller Abgaben netto:" unit="€/MWh"/>
                    <InputNamePair  targetStateName="Erdgasgrundpreis" name="Erdgasgrundpreis:" unit="€/a"/>
                    <SubHeader subHeader="Wärme"/>
                    <InputNamePair  targetStateName="JahresanlagennutzungsgradWärmeerzeuger" name="Jahresanlagennutzungsgrad Wärmeerzeuger:" unit="%"/>
                    <OutputNamePair name="entspricht einem Wärmebedarf:" value={nonStateOutputStore.entsprichtEinemWärmebedarf} unit="MWh/a"/>
                    <OutputNamePair name="entspricht einem Wärmepreis:" value={nonStateOutputStore.entsprichtEinemWärmepreis} unit="€/MWh"/>
                </InputSeperator>
                {/*right side*/} 
                <InputSeperator>
                    <SubHeader subHeader="Strom"/>
                    <InputNamePair  targetStateName="GesamtbedarfStrom" name="Gesamtbedarf Strom:" unit="MWh/a"/>
                    <InputNamePair  targetStateName="DurchschnittspreisBezug" name="Durchschnittspreis Bezug:" unit="Ct/kWh"/>
                    <InputNamePair  targetStateName="Stromsteuer" name="Stromsteuer:" unit="Ct/kWh"/>
                    <InputNamePair  targetStateName="EEGUmlage" name="EEG-Umlage:" unit="Ct/kWh"/>
                    <InputNamePair  targetStateName="KWKAufschlagCa" name="KWK Aufschlag ca.:" unit="Ct/kWh"/>
                    <InputNamePair  targetStateName="SonstigeAbgaben" name="sonstige Abgaben:" unit="Ct/kWh"/>
                    <OutputNamePair name="Strompreis inkl. aller Abgaben:" value={nonStateOutputStore.stromInklAllerAbgabenInCt} unit="Ct/kWh"/>
                    <OutputNamePair name="Strompreis inkl. aller Abgaben:" value={nonStateOutputStore.stromInklAllerAbgabenInEuro} unit="€/MWh"/>
                </InputSeperator>
             </InputShell>

             {/*Rahmendaten für die Neuanlage Section*/}
             <InputShell header="Rahmendaten für die Neuanlage">
                {/*left side*/}
                <InputSeperator>
                    <SubHeader subHeader="Auswahl BHKW"/>
                    <InputNamePair  targetStateName="elektrischeLeistung" name="elektrische Leistung:" dropdown={true} unit="kWel"/>
                    <OutputNamePair name="Thermische Leistung:" value={nonStateOutputStore.thermischeLeistung} unit="kWth"/>
                    <OutputNamePair name="Brennstoffleistung Hi:" value={nonStateOutputStore.brennstoffleistungHi} unit="kW"/>
                    <OutputNamePair name="Brennstoffleistung Hs:" value={nonStateOutputStore.brennstoffleistungHs} unit="kW"/>
                    <InputNamePair  targetStateName="BetriebsstundenBHKW" name="Betriebsstunden BHKW:" unit="h/a"/>
                    <InputNamePair  targetStateName="EEXVergütungInklVermNetznutzung" name="EEX Vergütung inkl. verm. Netznutzung:" unit="€/MWh"/>
                    <InputNamePair  targetStateName="Inbetriebnahmedatum" name="Inbetriebnahmedatum:" unit="-"/>
                </InputSeperator>
                {/*right side*/}
                <InputSeperator>
                    <SubHeader subHeader="Ergenisse BHKW" />
                    <OutputNamePair name="erzeugte Strommenge im BHKW:" value={nonStateOutputStore.erzeugteStrommengeImBHKW} unit="MWh/a" />
                    <InputNamePair  targetStateName="DavonInsNetzEingespeist" name="...davon ins Netz eingespeist:" unit="%"/>
                    <OutputNamePair name="entspricht:" value={nonStateOutputStore.entspricht} unit="MWh/a" />
                    <OutputNamePair name="Wärmeproduktion BHKW:" value={nonStateOutputStore.wärmeproduktionBHKW } unit="MWh/a" />
                    <OutputNamePair name="Brennstoffeinsatz im BHKW Hi:" value={nonStateOutputStore.brennstoffeinsatzImBHKWHi} unit="MWh/a" />
                    <OutputNamePair name="Brennstoffeinsatz im BHKW Hs:" value={nonStateOutputStore.brennstoffeinsatzImBHKWHs} unit="MWh/a" />
                    <SubHeader subHeader="daraus folgt:"/>
                    <OutputNamePair name="Summe Reststrombezug:" value={nonStateOutputStore.summeRestrombezug} unit="MWh/a" />
                    <OutputNamePair name="Summe Restwärme aus Kessel:" value={nonStateOutputStore.summeRestwärmeAusKessel} unit="MWh/a" />
                    <OutputNamePair name="Brennstoffeinsatz im Kessel Hs:" value={nonStateOutputStore.brennstoffeinsatzImBHKWHs} unit="MWh/a" />
                </InputSeperator>
             </InputShell>
             {/*Investitions Daten*/}
             <InputShell headerLeft="Investitions Daten" headerRight="sonstige Parameter">
                 {/*left side*/}
                <InputSeperator>
                    <InputNamePair targetStateName="InvestitionLautAnbieter" name="Investition laut Anbieter:" unit="€"/>
                    <InputNamePair targetStateName="KapitalzinsDerFinazierendenBank" name="Kapitalzins der finazierenden Bank:" unit="%" />
                    <InputNamePair targetStateName="Finanzierungszeitraum" name="Finanzierungszeitraum:" unit="a" />
                    <InputNamePair targetStateName="Vollwartung" name="Vollwartung:" unit="€/Bh" />
                    <InputNamePair targetStateName="KostenVollrevision" name="Kosten Vollrevision:" unit="€" />
                    {/*fehlendes Einfügen!!!!!*/}
                </InputSeperator>
                {/*right side*/}
                <InputSeperator>
                    <InputNamePair targetStateName="ErdgassteuerRückerstattung" name="Ergassteuer Rückerstattung" unit="€/MWh"/>
                    <InputNamePair targetStateName="AnteilEEGUmlageEigenstrom" name="Anteil EEG-Umlage Eigenstrom" unit="%"/>
                    <InputNamePair targetStateName="SteigerungErdgasProA" name="Steigerung Erdgas pro a:" unit="%"/>
                    <InputNamePair targetStateName="SteigerungStromProA" name="Steigerung Strom pro a:" unit="%"/>
                    <InputNamePair targetStateName="PreissteigerungenWartungProA" name="Preissteigerungen Wartung pro a:" unit="%"/>
                </InputSeperator>
             </InputShell>

             {/*Final Output Section*/}

             <FinalOutputSection />
             
        </div>
    )
}

export default MainHomeScreen