import React, {useEffect, useState} from "react";
import './styles.css';
import { MdNotificationAdd } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Api from '../../services/api.js';
import Icone from  '../../assets/image/favicon.png';
import { FaAngleDoubleUp } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";



export default function HeaderComponente(){
    const Hystory = useNavigate();
    const [ notification, setNotifications] = useState([])
    // buscar sessionstorage e encaminhar na request para solicitar as notificações do usuário.
    const Data = {
        userA: sessionStorage.getItem('tokenCrister'),
        userB: sessionStorage.getItem('tokenColab'),
        userC: sessionStorage.getItem('token'),
    }
    useEffect(() => {
    Api.post('/getNotification', Data).then( (response) => {
        // confere que veio um array
      setNotifications(response.data.notifications);
      console.log(response.data.notifications.length)
      console.log(notification)
      
      })
      .catch(() => {
        alert('Erro interno.');
      });
  }, []);
  console.log(notification)
  //se o valor for 0 esconder a div com o numero:
  if(notification === 0){
    const bolaNotifications = document.getElementById('NN');
    // Para ocultar o elemento
    bolaNotifications.style.display = 'none';
  }
  // nao esquecer de criar as notificações para o cliente tbm.

    async function Exit() {
        console.log('sair')
        sessionStorage.removeItem("tokenCrister");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem('tokenColab');
        Hystory('/');
        
    }
    
    function redirect(){
        var crister = sessionStorage.getItem("tokenCrister");
        var cristerColab = sessionStorage.getItem("tokenColab"); // Alterei aqui para buscar a chave correta

        if (cristerColab) {
            console.log('Redirecionando para dashboardColab');
            Hystory('/dashboardColab');
        } else if (crister) {
            console.log('Redirecionando para dashboardCrister');
            Hystory('/dashboardCrister');
        } else {
            console.log('Redirecionando para dashboardCliente');
            Hystory('/dashboardCliente');
        }
    };
    async function showNotifications() {
        console.log('mostrar notificações')
        let containerNotificaation = document.querySelector("#containerNotifications")
        containerNotificaation.style.display = 'block';
        
        
    }
    async function UP() {
        let containerNotificaation = document.querySelector("#containerNotifications")
        containerNotificaation.style.display = 'none';
    };

    // crair uma função useEfect para buscar as notificaçlções no bano ce
    return(
        <>
            <div id="headerComponente">
                <a id="linkHeaderComponente" onClick={redirect}>Dashboard</a>
                <a onClick={Exit} ><GiExitDoor className="notificationCliente" size={25} /></a>
                <div id="numNotification">
                    <div id="NN">
                        <p>{notification.length}</p>
                    </div>
                    <MdNotificationAdd onClick={showNotifications} id="notificationCliente" size={25} />
                </div>
            </div>
            <div id="containerNotifications">
                <h1>Notificações</h1>
                <div onClick={UP} id="CorpoUP">
                    <FaAngleDoubleUp  id="up" color="white" />
                </div>
                {notification.map((conteudo, index) => {
                    async function updateNotificationStatus() {
                        console.log(conteudo.id)
                        let Data = { id: conteudo.id}

                        Api.post('updateStatusNotifcation', Data).then((response)=>{
                            console.log(response)
                        })
                        let corpoNotifications = document.querySelector(`#_${conteudo.id}`);
                        corpoNotifications.style.display = 'none'
                        console.log(corpoNotifications)
                        
                    }

                    return(
                        <div id={`_${conteudo.id}`} className="copronotification" key={index}>
                            <img className="imgIcon" src={Icone} alt="icone notificação"/>
                            <p className="corpoNitification">{conteudo.corpoNotification}</p>
                            <FiCheckSquare  onClick={updateNotificationStatus} size={40} color="white"/>

                        </div>
                    );
                })}
                
            </div>
        </>
    );
};