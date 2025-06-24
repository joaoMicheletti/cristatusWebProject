import React, { useState } from "react";
import './styles.css';
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
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
        { img:  Manual, link: "manualAplication", description: "Manual da do aplicativo" },
        { img: Analise, link: "analiseCliente", description: "Analise e liberação" },
        { img:  Metricas, link: "", description: "Relatorio de Métricas." },

        { img:  Agenda, link: "", description: "Agenda de Eventos." },
        { img:  ADM, link: "administrativo", description: "Administrativo" },
        
    ];

    const moveCarousel = (direction) => {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

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
