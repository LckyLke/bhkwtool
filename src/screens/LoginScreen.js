import React from 'react'
import Login from "../components/FirebaseAuth/Login"
import NavigationHeader from "../components/NavigationHeader"
import Footer from "../components/Footer"


const LoginScreen = () => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <NavigationHeader/>
            <Login />
            <Footer/>
            
        </div>
    )
}

export default LoginScreen
