import React, { useState } from "react";
import './styles.css';
import HeaderComponente from "../../../componentes/header_componente";
import _01 from '../../../assets/capa_Dashboard/01.png';
import _02 from '../../../assets/capa_Dashboard/02.png';
import _03 from '../../../assets/capa_Dashboard/03.png';
import _04 from '../../../assets/capa_Dashboard/04.png';
import _05 from '../../../assets/capa_Dashboard/05.png';
import _06 from '../../../assets/capa_Dashboard/06.png';
import Manual from '../../../assets/capa_Dashboard/07.webp'; // manuao arte 
import Analise from '../../../assets/capa_Dashboard/analise.webp'; // analise
import ADM from '../../../assets/capa_Dashboard/adm.webp'; //adm image
import Agenda from '../../../assets/capa_Dashboard/eventos.webp'// eventos img 
import Metricas from '../../../assets/capa_Dashboard/metricas.webp'; // relatioro img 
import { useNavigate } from "react-router-dom";
import Api from '../../../services/api';

export default function Dashboard() {
    const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
            sessionStorage.setItem("token", token);
        }
    const Hystory = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const images = [
        _01,
        _02,
        _03,
        _04,
        _05,
        _06
    ];

    const cards = [
        { img:  Manual, link: "manualAplication", description: "Manual da do aplicativo" },
        { img: Analise, link: "analiseCliente", description: "Analise e liberação" },
        { img:  Metricas, link: "", description: "Relatorio de Métricas." },

        { img:  Agenda, link: "", description: "Agenda de Eventos." },
        { img:  ADM, link: "administrativo", description: "Administrativo" },        
        { img:  Metricas, link: "arquivoMorto", description: "Arquivo Morto" },
        { img:  Metricas, link: "ajustesCliente", description: "Ajustes" },
        
    ];

    const moveCarousel = (direction) => {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
        .then(async serviceWorker => {
            // Função de conversão necessária para a chave pública
            function urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
                const base64 = (base64String + padding)
                    .replace(/-/g, '+')
                    .replace(/_/g, '/');

                const rawData = atob(base64);
                const outputArray = new Uint8Array(rawData.length);

                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            }

            let subscription = await serviceWorker.pushManager.getSubscription();
            console.log(subscription);

            if (!subscription) {
                const publicKeyResponse = await Api.get('/notificationsKey');

                subscription = await serviceWorker.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicKeyResponse.data.publicKey)
                });
            }

            console.log({ subscription });

            // Verificar quem está logado
            let token = sessionStorage.getItem('token');
            let tokenCrister = sessionStorage.getItem('tokeCrister');

            const Data = {
                token,
                typeUser: "cliente", 
                tokenCrister,
                subscription
            };

            if (token) {
                console.log(token);
                let resgisterUser = await Api.post('/notificationsRegister', Data);
                console.log(resgisterUser.data);
            }
        })
        .catch(error => {
            console.error('Erro ao registrar o service worker:', error);
        });
    };

    // Solicitar permissão para notificações
    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
            console.log('Permissão de notificação:', permission);
            if (permission === 'granted') {
                // Aqui você pode disparar uma notificação de exemplo, se quiser:
                /*new Notification('Notificações ativadas!', {
                    body: 'Você receberá novidades da Cristatus 🚀',
                    icon: '/icon.png' // Opcional: coloque o caminho do seu ícone
                });*/
            }
        });
    }

    return (
        <>
            <HeaderComponente />

            {/* Carrossel */}
            <section className="carousel-container">
                <div className="carousel">
                    <img src={images[currentIndex]} alt={`Imagem ${currentIndex + 1}`} className="carousel-item" />
                </div>
                <button className="prev" onClick={() => moveCarousel(-1)}>&#10094;</button>
                <button className="next" onClick={() => moveCarousel(1)}>&#10095;</button>
            </section>

            {/* Cards */}
            <section className="cards-container">
                {cards.map((card, index) => {
                    async function redirect(){
                        Hystory(`/${card.link}`)

                    }
                    return(
                        <div className="cardDashCrister" key={index}>
                        <div onClick={redirect} className="card-img">
                            <img src={card.img} alt={`Card ${index + 1}`} className="card-img-inner" />
                        </div>
                        <p  className="card-description">{card.description}</p>
                    </div>
                    )
                })}
            </section>
        </>
    );
}
