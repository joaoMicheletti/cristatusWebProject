import React, { useState } from "react";
import './styles.css';
import HeaderComponente from "../../../componentes/header_componente";
import _01 from '../../../assets/capa_Dashboard/01.png';
import _02 from '../../../assets/capa_Dashboard/02.png';
import _03 from '../../../assets/capa_Dashboard/03.png';
import _04 from '../../../assets/capa_Dashboard/04.png';
import _05 from '../../../assets/capa_Dashboard/05.png';
import _06 from '../../../assets/capa_Dashboard/06.png';
import _07 from '../../../assets/capa_Dashboard/07.webp';
import Criacao from  '../../../assets/capa_Dashboard/criacao.webp';
import Update from '../../../assets/capa_Dashboard/update.webp'
import Aprovacao from '../../../assets/capa_Dashboard/aprovacao.webp'
import Ajustes  from '../../../assets/capa_Dashboard/ajustes.webp';
import Chave from '../../../assets/capa_Dashboard/chave.webp';
import Register from '../../../assets/capa_Dashboard/register.webp';
import { useNavigate } from "react-router-dom";
import Api from '../../../services/api';

export default function Dashboard() {
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
        { img: Criacao, link: "createContent", description: "Create Content" },
        { img: Update, link: "updateMaterial", description: "Atualização de Material" },
        { img: Aprovacao, link: "aprovacao", description: "Aprovação de conteudo" },
        { img: Ajustes, link: "solicitacoes", description: "Ajustes Solicitados"},
        { img: Chave, link: "chave", description: "Cahve de acesso "},
        { img: Register, link: "cadUSer", description: "Cadastro de Cliente "}
        
        
    ];

    const moveCarousel = (direction) => {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };
    // Registrar o service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(async serviceWorker => {
            let subscription = await serviceWorker.pushManager.getSubscription();
            console.log(subscription)

            if(! subscription){
                const publicKeyResponse = await Api.get('/notificationsKey')
                subscription = await serviceWorker.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: publicKeyResponse.data.publicKey
                });
            }
            console.log({subscription})
            // verificar quem esta logado logado na aplicação usuário ou Crister ou visitante do nosso site.
            let token = sessionStorage.getItem('token');
            let tokenCrister = sessionStorage.getItem('tokenCrister');
            const Data = {
                token,
                tokenCrister,
                subscription
            }
            console.log(Data)
            if(tokenCrister){
                console.log(token)
                let resgisterUser = await Api.post('/notificationsREgister', Data)
                console.log(resgisterUser.data)
            }
        })
    }
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
