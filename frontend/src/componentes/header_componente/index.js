import React from "react";
import './styles.css';
import { MdNotificationAdd } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";



export default function HeaderComponente(){
    const Hystory = useNavigate();
    async function Exit() {
        console.log('sair')
        sessionStorage.removeItem("tokenCrister");
        sessionStorage.removeItem("token");
        Hystory('/');
        
    }
    
    function redirect(){
        var verification = sessionStorage.getItem("tokenCrister");
        if (verification === null){
            Hystory('/dashboardCliente');
        } else {
            Hystory('/dashboardCrister');
        };
    };
    return(
        <>
            <div id="headerComponente">
                <a id="linkHeaderComponente" onClick={redirect}>Dashboard</a>
                <a onClick={Exit} ><GiExitDoor className="notificationCliente" size={25} /></a>
                <div id="numNotification">
                    <div>
                        <p>999</p>
                    </div>
                    
                    <MdNotificationAdd id="notificationCliente" size={25} />
                </div>
                
            </div>
        </>
    );
};