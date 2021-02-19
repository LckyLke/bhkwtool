import React, { useEffect, useState } from 'react'



const CookieConsent = () => {

    const [cookieConsentPos, setCookieConsentPos] = useState("-bottom-96")

    useEffect(() => {
    if(!localStorage.getItem("cookieBannerDisplayed")) {
        setTimeout(() => {
            setCookieConsentPos("bottom-0")
        },1000)
    }
    },[])

    const removeCookieBannerAndSetStorage = () => {
        localStorage.setItem("cookieBannerDisplayed", true)
        setCookieConsentPos("-bottom-96")
    }

    return (
        <div className={"fixed active:bottom-0 left-0 right-0 bg-gray-800 text-gray-100 py-2 transition-all active: shadow-md mx-10 border-gray-400 border-2 " + cookieConsentPos} >
            <p>
                We use cookies in this website to give you the best experience on our site.
                To find out more, read our privacy policy and cookie policy.
            </p>

            <button onClick={removeCookieBannerAndSetStorage} className="bg-yellow-500 py-2 px-8 cursor-pointer">Okay</button>
        </div>
    )
}

export default CookieConsent
