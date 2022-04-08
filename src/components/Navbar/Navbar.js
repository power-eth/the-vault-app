import React, { useState } from "react";
import AuthButton from "../AuthButton/AuthButton";



function Navbar({ defaultAccount, setDefaultAccount, errorMessage, setErrorMessage, isLoggedIn, setIsLoggedIn }) {
    return ( 
        <>
            <h3>THE VAULT - NAVBAR</h3>
            <br/>
            {/* Left Side - Social Media Icons */}
            <div>
                <a href='https://twitter.com'>Twitter</a> <br/>
                <a href='https://telegram.com'>Telegram</a>
            </div>
            {/* Right Side - Sections and Connect */}

            {/* Connect */}
            <AuthButton
                defaultAccount = {defaultAccount}
                setDefaultAccount = {setDefaultAccount}
                errorMessage = {errorMessage}
                setErrorMessage = {setErrorMessage}
                isLoggedIn = {isLoggedIn}
                setIsLoggedIn = {setIsLoggedIn}
            />      
        </>
     
     );
}

export default Navbar;