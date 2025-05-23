import React, { useState, useEffect } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import './style.css';
import Api from '../../../services/api';
import { FaCalendarAlt } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import clickSound from '../../../assets/music/aproved.mp3'

export default function AprovacaoConteudo() {
  // 1. cliente inicia como array
  const [cliente, setCliente] = useState([]);
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [calendario, setCalendario] = useState([]);
  const [selecionado, setSelecionado] = useState('');

  useEffect(() => {
    Api.get("getUser")
      .then(response => {
        const data = response.data.res;
        // 2. se vier objeto, converte para array
        const arr = Array.isArray(data) ? data : Object.values(data);
        console.log(arr)
        setCliente(arr);
      })
      .catch(err => console.error("Erro ao buscar clientes:", err));
  }, []);

  async function BuscarCalendario() {
    document.querySelector("#Alerta").innerText = "";
    if (!selecionado || selecionado === 'selecione') {
      document.querySelector("#Alerta").innerText = "Selecione um Cliente!";
      return;
    }
    if (!inicio || !fim) {
      document.querySelector("#Alerta").innerText = "Defina as datas!";
      //return;
    }

    try {
      const { data } = await Api.post('buscarAprovacao', {
        inicio,
        fim,
        tokenUser: selecionado
      });
      console.log(data)
      console.log(calendario)
      if (typeof data === 'string') {
        document.querySelector("#Alerta").innerText = 'selecione uma data';
      } else {
        setCalendario(data);
        console.log(calendario)
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <HeaderComponente/>
      <section id="sectionAprovacao">
        <h1>falta definir a função de solicitar ajusta nao esqueça</h1>
        <div className="containerAprovacao">
          <div className="selectClient">
            <label>
              Selecionar Cliente:<br/>
              <select
                value={selecionado}
                onChange={e => setSelecionado(e.target.value)}
              >
                <option value='selecione'>— Selecione o Cliente —</option>
                {/* 3. mapeia só se for array */}
                {Array.isArray(cliente) && cliente.map(item => (
                  <option
                    key={item.id}
                    value={item.token}
                  >
                    {item.user}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="dataCronogramaSelect">
            <label>
              Data de início:<br/>
              <input
                type="date"
                value={inicio}
                onChange={e => setInicio(e.target.value)}
              />
            </label>
            <label>
              Data de término:<br/>
              <input
                type="date"
                value={fim}
                onChange={e => setFim(e.target.value)}
              />
            </label>
          </div>
          <div className="btnDiv">
            <p id="Alerta"></p>
            <input
              type="button"
              className="bntBuscarCronograma"
              value='Buscar'
              onClick={BuscarCalendario}
            />
          </div>
        </div>

        <div className="conteudoAprovacao">
          {calendario.map((item) => {
            //aprovar o material:
            /**
             * ao aprovar o material, no banoc de dados sera inserido na coluna aprovadoCrister o valor "aprovado"
             */
            async function aprovarParaCliente() {
              let Data = {
                dia: item.dia,
                mes: item.mes,
                ano: item.ano,
                tokenUser: item.tokenUser,
                aprovadoCrister: "aprovado",
               };
              await Api.post('/aprovarParaCiente', Data)
              .then((response) => {
                if(response.data.res === 1){
                  let display = document.querySelector(`#_${item.id}`);
                  display.style.display = 'none'
                
                  const audio = new Audio(clickSound);
                  audio.volume = 1;
                  audio.play();
                }
              }).catch((erro) => {
                console.log(erro);
              });              
            }
            
            return(

              <div className="contentpublication" id={`_${item.id}`}  key={item.id} >
                
                <div className="dataContent">
                    <FaCalendarAlt size={20}/>
                    <p className="txtDataContent">{`${item.dia}/${item.mes}/${item.ano}`}</p>
                </div>

                <div className="coteudoArte">
                    <label>
                        Tema:
                        <h3>{item.tema}</h3>
                        <br/>
                    </label>

                </div>

                <div className="coteudoArte">
                    <label>
                        Formato:
                        <h3>{item.formato}</h3>
                    </label>
                </div>

                <div className="coteudoArte">
                  <MdNavigateBefore id={`_${item.id}`} className="seta" size={30} />
                  <div className="art">art publicação here</div>                            
                  <MdNavigateNext id={`__${item.id}`} className="seta" size={30} />
                </div>
        
                
        
                <div className="legendaCliente">
                    <h3>Legenda:</h3>
                    <p  className="legendaPublicação">
                      {item.legenda}
                    </p>
                </div>

                <div className="roteiroStoryCliente">
                    <h3>Instrução de roteiro Story</h3>
                    
                    <div className="SenMovie">
                        <p className="responseSendMovi"></p>
                        <label>
                            anexar PDF de roteiro, do "DIA"
                            <input  className="inputSend" type="file"/>
                        </label>
                        <buttonn type='buttonn'  className="sendMoviBtn">Enviar</buttonn>
                    </div>
                </div>

                <div className="BtnAprovação">
                    <buttonn onClick={aprovarParaCliente} type="buttonn"  className="btnAprova" >Aprovar</buttonn>
                </div>
              </div>

            );
          })}


          
        </div>
      </section>
      <FooterComponente/>
    </>
  );
}
