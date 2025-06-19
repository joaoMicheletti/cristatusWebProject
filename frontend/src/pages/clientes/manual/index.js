import React from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import "./style.css";

export default function Manual(){
    return(
        <>
            <HeaderComponente/>
            <section id="manualContainer">
                <p id="tituloManual">Manual do Cliente Crister</p>
                <div className="divTototial">
                    <p className="description">
                        Descubra como nossa plataforma 
                        simplifica o manuseio de arquivos, 
                        organizando, armazenando e 
                        disponibilizando-os instantaneamente para 
                        que sua equipe execute todas as 
                        tarefas com agilidade e segurança.
                    </p> 
                    <div className="videoTutorial">
                        <p>Video aqui, assim que estiver pronto</p>
                    </div>
                </div>
                <div className="divTototial">
                    <p className="description">
                        Confira neste tutorial como gravar 
                        seus materiais para feed e stories: 
                        do enquadramento ideal à captura de áudio, 
                        garantindo qualidade e engajamento.
                    </p> 
                    <div className="videoTutorial">
                        <p>Video aqui, assim que estiver pronto</p>
                    </div>
                </div>
            </section>
        </>
    );
};