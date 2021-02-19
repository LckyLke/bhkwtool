import React from 'react'
import app from "../../Firebase"

const LogoutBtn = () => {
    return (
        <button onClick={() => app.auth().signOut()}>Abmelden</button>
    )
}

export default LogoutBtn
