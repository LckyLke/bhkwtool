import React from "react"
import {Link} from "react-router-dom"

const Footer = props => {
    return (
        <footer className={"flex justify-between bg-gray-800 text-sm py-2 shadow-lg text-gray-200 " + props.passStyle}>
            <div className="text-left pl-1">Design and development by Luke Friedrichs</div>
            <div className="text-right">Contact: lukefriedrichsdev@gmail.com</div>
            <Link to="/impressum"><div className="text-right">Impressum</div></Link>
            <div className="text-right pr-1">©2021</div>
        </footer>
    )
}

export default Footer