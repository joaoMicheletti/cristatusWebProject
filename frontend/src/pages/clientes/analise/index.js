import React from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import './styles.css';
import { FaCalendarAlt } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useState } from "react";



export default function AnaliseCliente(){
    // usaremos useeffectr para ao caregar a pagina buscar todas as publicações no banco dce dados.
    var [ img, setImg] = useState([]); // armazenar os arquivos 
    var [ajuste, setAjuste] = useState(""); // armazenar o ajuste a ser realizado na aplicação.

    // funcoinalidade para dentro do .map ao renderizar cada elemento 
    //função para mostrar o campo onde o usuario pode solicitar os ajustes da publicação
    async function updateContent() {
        var ajustArea = document.querySelector('.ajustecontent');
        ajustArea.style.display = "block"; 
    };
    //funcion para enviar o ajuste
    async function sendUPdate() {
        if(ajuste === ''){
            document.querySelector('.responseSendUpdate').innerHTML = "* Preencha o campo com os ajustes!"
        } else {
            // realizar o envio das informaçõs ao banco de dados.
            var ajustArea = document.querySelector('.ajustecontent');
            ajustArea.style.display = "none";
        };       
    };
    //function para enviar o materil dos storys :
    async function sendMovi() {
        console.log(img.length)
        if(img.length === 0){
            document.querySelector('.responseSendMovi').innerHTML = "* Selecione um arquivo!"
        };    
    };

    //funcionalidade para aprovação do material.
    async function aprovedContent() {
        console.log('aprovado');
        // tratativas de aprovação/ com o backend + automação de publicação.
    }

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
                        <div className="roteiroStoryCliente">
                            <h3>Instrução de roteiro Story</h3>
                            <p> loremloremloremloremloremloremlorem 
                                loremloremloremloremloremloremlorem
                                loremloremloremloremloremloremlorem
                                loremloremloremloremloremloremlorem
                            </p>
                            <div className="SenMovie">
                                <p className="responseSendMovi"></p>
                                <label>
                                    Selecione o vídeo.
                                    <input  onChange={e => setImg(e.target.value)} className="inputSend" type="file"/>
                                </label>
                                <buttonn type='buttonn'  onClick={sendMovi} className="sendMoviBtn">Enviar</buttonn>
                            </div>
                        </div>
                        <div className="BtnAprovação">
                            <buttonn type="buttonn" onClick={aprovedContent} className="btnAprova" >Aprovado</buttonn>
                            <buttonn  type="buttonn" onClick={updateContent}  className="btnAprova">Ajustar</buttonn>
                        </div>
                        <div className="ajustecontent">
                            <p>Descreve o ponto a ser ajustado!</p>
                            <br/>
                            <p className="responseSendUpdate"></p>
                            <textarea className="txtAreaAjuste" onChange={e => setAjuste(e.target.value)} placeholder="  Descreva o posto a ser ajustado."></textarea>
                            <buttonn type='buttonn' onClick={sendUPdate} className="solicitarAjuste">Solicitar ajuste</buttonn>
                        </div>
                    </div>

                </div>
            </section>
            
            <FooterComponente/>
        </>
    );
};