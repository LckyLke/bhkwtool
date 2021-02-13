import "./navigationHeader.css"
import { AiOutlineInfoCircle } from "react-icons/ai";
import useStore from "../store/useStore"
import React from "react"
import ReactFileReader from 'react-file-reader';
import cloneDeep from 'lodash/cloneDeep'

import {Link} from "react-router-dom"




 

const NavigationHeader = props => {

    const state = useStore()

    const objectToCsv = (data) => {
        //alles außer die Update Fuction wird zu csv transformiert!
        const csvRows = []
        let newData = cloneDeep(data)
    
        delete newData.updateValue
        const headers = Object.keys(newData)
        const values = Object.values(newData)
        
        csvRows.push(headers.join(","))
        csvRows.push(values.join(","))
        
        
    
        return csvRows.join('\n')
        
    }

    const download = (data) => {
        const blob = new Blob([data], {type: "text/xls"})
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.setAttribute("hidden", "")
        a.setAttribute("href", url)
        a.setAttribute("download", (state.Projekt !== "" ? state.Projekt : "Projekt") + ".csv")
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const updateValuesImport = (importedData) => {
        if (importedData.indexOf("Projekt,Straße,PLZ,APKunde,Bearbeiter,Datum,GesamtbedarfErdgasFürHeizungUndWarmwasser,BasisgaspreisInklAllerAbgabenNetto,Erdgasgrundpreis,JahresanlagennutzungsgradWärmeerzeuger,GesamtbedarfStrom,DurchschnittspreisBezug,Stromsteuer,EEGUmlage,KWKAufschlagCa,SonstigeAbgaben,elektrischeLeistung,BetriebsstundenBHKW,EEXVergütungInklVermNetznutzung,Inbetriebnahmedatum,DavonInsNetzEingespeist,InvestitionLautAnbieter,KapitalzinsDerFinazierendenBank,Finanzierungszeitraum,Vollwartung,KostenVollrevision,ErdgassteuerRückerstattung,AnteilEEGUmlageEigenstrom,SteigerungErdgasProA,SteigerungStromProA,PreissteigerungenWartungProA") !== -1) {
        console.log(importedData)
        let importArrKeys = importedData.split(/\r?\n/)[1].split(",")
        let importArrValues = importedData.split(/\r?\n/)[2].split(",")

        for (let i = 0; i < importArrKeys.length; i++) {
            state.updateValue(importArrValues[i],importArrKeys[i])
        }
        return
        }
        alert("Upload valid file! - File has to be generate using the export of this website! \nFor more click on info!")
        
    }

    const handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            console.log(reader.result)
            updateValuesImport(reader.result)
        }
        reader.readAsText(files[0]);
    }

    const exportFunction = () => {
        const csvData = objectToCsv(state)
        download("SEP=,\n" + csvData)
    }
    
    return (
    
        <nav>
            
            <div id="navbar" className={"bg-white justify-between flex py-3.5 object-top w-full top-0 shadow-md fixed z-10"}>
                <Link to="/impressum">
                    <div className="group flex ml-10 shadow-md p-1.5 align-middle border-red-300 border-2 rounded-md">
                        <span>BHKWCalculator</span><span className="text-xs text-red-500">Testversion</span><span className="group-hover:animate-bounce" ><AiOutlineInfoCircle color=""/></span>
                    </div>
                    
                </Link>

                <div className="flex justify-around w-3/5">
                    <Link to="/" className="linkElement" ><span className="group-hover:text-white linkElementSpan">Home</span></Link>
                    <div className="border-r-2 pr-2 border-black"></div>
                    <Link to="/info" className="linkElement" ><span className="group-hover:text-white linkElementSpan">Info</span></Link>
                    <div className="border-r-2 pr-2 border-black"></div>
                    <button onClick={exportFunction} className="buttonElement"> <span className="group-hover:text-white linkElementSpan">Export</span></button>
                    <div className="border-r-2 pr-2 border-black"></div>
                    
                    <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}><button className="buttonElement"> <span className="group-hover:text-white linkElementSpan">Import</span></button></ReactFileReader>
                   
                </div>
                
            </div>
        </nav>
        
    )
}

export default NavigationHeader