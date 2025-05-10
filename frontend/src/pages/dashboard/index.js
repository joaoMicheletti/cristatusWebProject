import React, { useState } from "react";
import './styles.css';
import HeaderComponente from "../../componentes/header_componente";
import FooterComponente from "../../componentes/footer_componente";
import _01 from '../../assets/capa_Dashboard/01.png';
import _02 from '../../assets/capa_Dashboard/02.png';
import _03 from '../../assets/capa_Dashboard/03.png';
import _04 from '../../assets/capa_Dashboard/04.png';
import _05 from '../../assets/capa_Dashboard/05.png';
import _06 from '../../assets/capa_Dashboard/06.png';
import _07 from '../../assets/capa_Dashboard/07.png';

export default function Dashboard() {
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
        { img: _07, description: "Analise e liberação" },
        { img:  _07, description: "Relatorio de Métricas." },
        { img:  _07, description: " Kcickoff/acessos." },

        { img: _07, description: "ActionPlan"},
        { img:  _07, description: "Agenda de Eventos." },
        { img:  _07, description: "Meu Plano." },

        { img:  _07, description: "Conheça nossos Produtos." }
        
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
                {cards.map((card, index) => (
                    <div className="card" key={index}>
                        <div className="card-img">
                            <img src={card.img} alt={`Card ${index + 1}`} className="card-img-inner" />
                        </div>
                        <p className="card-description">{card.description}</p>
                    </div>
                ))}
            </section>

            <FooterComponente />
        </>
    );
}
