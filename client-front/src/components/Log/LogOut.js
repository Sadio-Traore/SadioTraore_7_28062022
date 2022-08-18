import React from "react";
import axios from "axios";
import cookie from "js-cookie";


const LogOut = () => {

    const removeCookie = (key) => {
        if (window !== 'undefined'){
            cookie.remove(key,{expire:1});

        }
    }

    const logout = async () => {
        await axios ({
            method:'get',
            url :`${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials:true,
        })
            .then (() => removeCookie('jwt'))
            .catch((err) => console.log(err))
        
        
        window.location='/';
    }

    return(
        <li onClick= {logout}>
            <img src = "" alt ="déconnexion" />


        </li>
    )
}

export default LogOut