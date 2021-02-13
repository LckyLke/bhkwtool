import NavigationHeader from "../components/NavigationHeader";
import React from "react"
import MainHomeScreen from "../components/HomeScreenComps/MainHomeScreen"
import Footer from "../components/Footer"

const HomeScreen = props => {
    return (
        <div className="font-mono flex flex-col justify-between h-screen">
            <NavigationHeader />
            <MainHomeScreen />
            <Footer />
        </div>
    )
}

export default HomeScreen