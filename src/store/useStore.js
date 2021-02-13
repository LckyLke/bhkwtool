import create from "zustand"

const useStore = create(set => ({
    //Kunde/Bearbeiter
    Projekt: "",
    Straße: "",
    PLZ: "",
    APKunde: "",
    Bearbeiter: "",
    Datum: "",
    //Gas
    GesamtbedarfErdgasFürHeizungUndWarmwasser: "",
    BasisgaspreisInklAllerAbgabenNetto: "",
    Erdgasgrundpreis: "",
    //Wärme
    JahresanlagennutzungsgradWärmeerzeuger: "",
    //Strom
    GesamtbedarfStrom: "",
    DurchschnittspreisBezug: "",
    Stromsteuer: "",
    EEGUmlage: "",
    KWKAufschlagCa: "",
    SonstigeAbgaben: "",
    //Auswahl BHKW
    elektrischeLeistung: "50",
    BetriebsstundenBHKW: "",
    EEXVergütungInklVermNetznutzung: "",
    Inbetriebnahmedatum: "",
    //Ergenisse BHKW
    DavonInsNetzEingespeist: "",
    //Werte aus EON Kalktool
    /*FixesPachtentgeld: "",
    BasispreisInstandhaltung: "",
    Laufzeitpreis: "",
    MindestBasislaufzeitpreis: "",
    */

    //Werte aus BHKW-Angebot
    InvestitionLautAnbieter: "",
    KapitalzinsDerFinazierendenBank: "",
    Finanzierungszeitraum: "",
    Vollwartung: "",
    KostenVollrevision: "",

    //sonstige Parameter
    ErdgassteuerRückerstattung: "",
    AnteilEEGUmlageEigenstrom: "",
    SteigerungErdgasProA: "",
    SteigerungStromProA: "",
    PreissteigerungenWartungProA: "",

    //update Function
    updateValue: (value, target) =>  set({[target]: value}),
    
    

}))

export default useStore