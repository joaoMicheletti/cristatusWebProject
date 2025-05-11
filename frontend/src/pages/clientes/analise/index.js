import React from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import './styles.css';
import { FaCalendarAlt } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";



export default function AnaliseCliente(){
    return(
        <>  
            <HeaderComponente/>

            <section id="analiseClienteSEction">

                <div id="containerAnaliseCliente">

                    <div className="contentpublication">

                        <div className="dataContent">
                            <FaCalendarAlt size={20}/>
                            <p className="txtDataContent">10/10/2025</p>
                        </div>

                        <div className="coteudoArte">
                            <MdNavigateBefore className="seta" size={30} />
                            <div className="art">art publicação here</div>                            
                            <MdNavigateNext className="seta" size={30} />
                        </div>

                        <div className="legendaCliente">
                            <p> loremloremloremloremloremloremlorem 
                                loremloremloremloremloremloremlorem
                                loremloremloremloremloremloremlorem
                                loremloremloremloremloremloremlorem
                            </p>
                        </div>
                        <div className="BtnAprovação">
                            <buttonn className="btnAprova" >Aprovado</buttonn>
                            <buttonn className="btnAprova">Ajustar</buttonn>
                        </div>
                        <div className="ajustecontent">
                            <p>Descreve o ponto a ser ajustado!</p>
                            <br/>
                            <textarea className="txtAreaAjuste" placeholder="  Descreva o posto a ser ajustado."></textarea>
                            <buttonn className="solicitarAjuste">Solicitar ajuste</buttonn>
                        </div>
                    </div>
                </div>
            </section>
            
            <FooterComponente/>
        </>
    );
};