import React, { useState } from "react";
import AuthButton from "../AuthButton/AuthButton";



function Navbar({ accounts, setAccounts}) {
    return ( 
        <>
            <h3>THE VAULT - NAVBAR</h3>
            <AuthButton
            accounts = {accounts}
            setAccounts = {setAccounts}
            />
            <br/>
            {/* Left Side - Social Media Icons */}
            <div>
                <a href='https://twitter.com'>Twitter</a> <br/>
                <a href='https://telegram.com'>Telegram</a>
            </div>
            {/* Right Side - Sections and Connect */}

            {/* Connect */}
           
        </>
     
     );
}

export default Navbar;