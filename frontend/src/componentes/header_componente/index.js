import React from "react";
import './styles.css';
import {Link} from 'react-router-dom'
import { MdNotificationAdd } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";



export default function HeaderComponente(){
    async function Exit() {
                
    };
    return(
        <>
            <div id="headerComponente">
                <Link id="linkHeaderComponente" to='/dashboardCliente'>Dashboard</Link>
                <GiExitDoor className="notificationCliente" size={25} />
                <MdNotificationAdd id="notificationCliente" size={25} />
            </div>
        </>
    );
};