import React from "react"
import NavigationHeader from "../components/NavigationHeader"
import Footer from "../components/Footer"
import InfoContainer from "../components/InfoScreenComps/InfoContainer"
import InfoHeader from "../components/InfoScreenComps/InfoHeader"
import InfoParagraph from "../components/InfoScreenComps/InfoParagraph"
import InfoImg from "../components/InfoScreenComps/InfoImg"
import InfoSectorBorder from "../components/InfoScreenComps/InfoSectorBorder"
import {Link} from "react-router-dom"

import kommaDarstellung from "../img/kommaDarstellung.png"
import SpalteMarkiert from "../img/SpalteMarkiert.png"
import zeileAusgwaehlt from "../img/zeileAusgwaehlt.png"
import kombinationMarkierung from "../img/kombinationMarkierung.png"
import exportKnopf from "../img/exportKnopf.png"
import importKnopf from "../img/importKnopf.png"


const InfoScreen = () => {
    return (
        <div className="flex font-mono flex-col justify-between h-screen">
            <NavigationHeader />
            <InfoContainer>
                <InfoHeader>Dezimaltrennzeichen</InfoHeader>
                <InfoParagraph>Das Programm nutzt die Englische Zahlenschreibweise und das Dezimaltrennzeichen wird durch einen Punkt (".") dargetsellt.</InfoParagraph>
                <InfoParagraph>Weiterhin werden keine Tausender Trennzeichen verwendet.</InfoParagraph>
                <InfoImg src={kommaDarstellung} alt="Bild, welches die Komma Darstellung zeigt." width="w-1/4"/>
                <InfoParagraph>Diese Zahl würde in der deutschen Schreibweise "1.000,15" entsprechen.</InfoParagraph>
                <InfoParagraph>Sollte Sie während ihre Dateneingabe das Dezimaltrennzeichen als Komma (",") eingeben wird diese automatisch durch einen Punkt (".") ersetzt.</InfoParagraph>
                <InfoSectorBorder/>
               
                <InfoHeader>Tab zum navigieren</InfoHeader>
                <InfoParagraph>Nutzen Sie die Tabulatortaste um zwischen den einzelen Eingabefeldern zu navigieren.</InfoParagraph>
                <InfoParagraph>Nur Tab wird genutzt um das nächste Eingabefeld auszuwälhen und die Hochstelltaste + Tab um das vorherige Eingabefeld auszuwälhen.</InfoParagraph>
                <InfoParagraph>Die Ausgaben werden in Echtzeit und direkt berrechnet.</InfoParagraph>
                <InfoSectorBorder/>
                
                <InfoHeader>Markieren von Spalten</InfoHeader>
                <InfoParagraph>Durch das klicken auf eine Spalte kann diese markiert werden und dadurch hervorgehoben werden.</InfoParagraph>
                <InfoImg src={SpalteMarkiert} alt="Im Bild wird die Spaltenmarkierung beispielhaft dargestellt." width="w-7/12"/>
                <InfoParagraph>Im Beispiel wurde die Vollrevisions Zeile hervorgehoben. Durch erneutes klicken auf die Spalte kann die Hervorgehebung wieder aufgehben werden.</InfoParagraph>
                <InfoSectorBorder/>

                <InfoHeader>Markieren von Zeilen</InfoHeader>
                <InfoParagraph>Einzelene Jahre können ebenfalls hervorgehoben werden. Dies kann man machen indem man auf das gewünschte Jahr klickt.</InfoParagraph>
                <InfoParagraph>Zum aufheben wird wieder einfach auf das entsprechend Jahr geklickt.</InfoParagraph>
                <InfoImg src={zeileAusgwaehlt} alt="Im Bild wird die Zeilenmarkierung beispielhaft dargestellt." width="w-7/12"/>
                <InfoParagraph>Im Beispiel wurde das Jahr 2024 hervorgehoben. Durch erneutes klicken auf das Jahresfeld kann die Hervorgehebung wieder aufgehoben werden.</InfoParagraph>
                <InfoSectorBorder/>

                <InfoHeader>Kombination: Markieren Zeile und Spalte</InfoHeader>
                <InfoImg src={kombinationMarkierung} width="w-7/12" alt="Im Bild wird die Kombination aus Zeilenmarkierung und Spaltenmarkierung beispielhaft dargestellt."/>
                <InfoParagraph>Im Bild lässt sich die Kombination aus Zeilenmarkierung und Spaltenmarkierung beispielhaft erkennen.</InfoParagraph>
                <InfoParagraph>Das markieren und aufheben der markieren funktioniert analog zu den unkombinierten Varianten.</InfoParagraph>
                <InfoSectorBorder/>

                <InfoHeader>Exportieren der Daten</InfoHeader>
                <InfoParagraph>Durch einen Klick auf den Export Knopf können die eingetragenen Daten als csv Datei exportiert werden.</InfoParagraph>
                <InfoImg src={exportKnopf} alt="Der Knopf der zum exportieren der Daten im csv Format genutzt wird." width="w-1/10"/>
                <InfoParagraph>Der Name der Datei entspricht dem im Projekt Feld eingetragenen Wert. Sollte kein Wert eingetragenen sein entspricht der Dateiname "Projekt".</InfoParagraph>
                <InfoSectorBorder/>

                <InfoHeader>Importieren der Daten</InfoHeader>
                <InfoParagraph>Durch einen Klick auf den Import Knopf können sie via Dialogfeld eine zu einem frühren Zeitpunkt exportiere csv Datei wieder importieren.</InfoParagraph>
                <InfoParagraph>Die Datei muss dabei durch die Website generiert worden seien. Andernfalls wird eine Fehlermeldung angezeigt.</InfoParagraph>
                <InfoImg src={importKnopf} alt="Der Knopf der zum importieren von Daten genutzt wird." width="w-1/10" />
                <InfoSectorBorder/>

                <InfoHeader>Bugs und Fehler</InfoHeader>
                <InfoParagraph>Da es sich bei der aktuellen Version um eine noch nicht fertige Testverion handelt können vereinzelt Bugs, Ungenauigkeiten oder Fehler auftreten.</InfoParagraph>
                <InfoParagraph>Sollten Sie während Ihrer Nutzung auf Fehler im Programm treffen können Sie an uns an die im <Link to="/impressum"><span className="text-green-500">Impressum</span></Link> und Footer gezeigte Mail Adresse eine Email schreiben.</InfoParagraph>
                <InfoParagraph>Diese sollte das Problem an sich beschreiben und wie man dieses hervorrufen kann.</InfoParagraph>
                <InfoParagraph>Bei anderweitigen Fragen kann die genannte Email ebenfalls verwendet werden</InfoParagraph>
                
            </InfoContainer>
            <Footer />
        </div>
    )
}

export default InfoScreen