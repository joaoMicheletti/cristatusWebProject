import React from "react";
import './styles.css';
import LogoINsta from '../../assets/instalogo.png';
import Cristatus from '../../assets/cristatus.png';
export default function FooterComponente(){
    return(
        <>
        <section id="FooterComponent">
            <div id="ContainerFooter">
                <div className="contentFooter">
                    <a><img id="CS" src={Cristatus} alt="img footer "/></a>
                </div>
                <div className="contentFooter">
                    <a><img id="iconeInsta" src={LogoINsta}  alt="img footer "/></a>
                </div>
                <div className="contentFooter">
                    <p id="direitos">Cristatus Marketing LTDA 36917166/0001-14 Todos os Diretos Reservados</p>
                </div>
                
            </div>
        </section>
            
        </>
    );
};