import React from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import './style.css';
import { useState } from "react";
import Api from '../../../services/api';
export default function(){
    const [calendario, setCalendario] = useState([]);
    // buscar clkinetes cadastrados
    //buscar calendario do cliente selecionado 
    const [cliente, setCliente] = useState('');
    const [inicio, setInicio] = useState('');
    const [fim, setFim] = useState('');
    async function BuscarCalendario() {
        if(cliente === '' || cliente === 'selecioone'){
            document.querySelector("#Alerta").innerHTML = "Selecione um Cliente!"
        } else {
            // request no back - buscar o calendario na data selecionada:
            let Data = { inicio, fim, tokenUser:cliente}
            await Api.post('buscarAprovacao', Data).then((Response) => {
                console.log(Response)
                if(Response.data === 'não foi enviado uma data') {
                    document.querySelector("#Alerta").innerHTML = "Defina uma data!"
                } else {
                    setCalendario(Response.data);
                    console.log(calendario, 'this calendar')

                }
            }).catch((Erro) => {
                console.log(Erro);
            });
        };

        
    }

    return(
        <>
            <HeaderComponente/>
            <section id="sectionAprovacao">
                <h1>Aprovação de conteudo /atualização.</h1>
                <div className="containerAprovacao">
                    <div className="selectClient">
                        <label>Selecionar Criente:<br/>
                            <select className="selecionClinete" onChange={e => setCliente(e.target.value)}>
                                <option value='selecione'> selecione o Cliente</option>
                                <option value='teste2'> teste2</option>
                                <option value='teste3'> steste</option>
                                <option value='teste4'> teste</option>
                            </select>
                        </label>
                    </div>
                    <div className="dataCronogramaSelect">
                        <label>
                            Data de inicio:<br/>
                            <input onChange={e => setInicio(e.target.value)} type="date"/>
                        </label>
                        <label>
                           Data de termino:<br/>
                            <input onChange={e => setFim(e.target.value)} type="date"/>
                        </label>
                    </div>
                    <div className="btnDiv">
                        <p id="Alerta"></p>
                        <input type="button" onClick={BuscarCalendario} className="bntBuscarCronograma" value='Buscar'/>
                    </div>
                </div>
            </section>
            <FooterComponente/>
        </>
    );
};