import React from "react";
import './styles.css';
import { MdNotificationAdd } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";



export default function HeaderComponente(){
    const Hystory = useNavigate();
    
    function redirect(){
        var verification = sessionStorage.getItem("tokenCrister");
        if (verification === null){
            Hystory('/dashboardCliente');
        } else {
            Hystory('/dashboardCrister');
        };
    };
    async function Exit() {
                
    };
    return(
        <>
            <div id="headerComponente">
                <a id="linkHeaderComponente" onClick={redirect}>Dashboard</a>
                <GiExitDoor className="notificationCliente" size={25} />
                <MdNotificationAdd id="notificationCliente" size={25} />
            </div>
        </>
    );
};