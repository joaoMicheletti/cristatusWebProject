import React, { useState, useEffect } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import './style.css';
import Api from '../../../services/api';
import { FaCalendarAlt } from "react-icons/fa";
import clickSound from '../../../assets/music/aproved.mp3';

export default function AprovacaoConteudo() {
  // índice atual para cada carrossel (por item.id)
  const URL = 'https://www.acasaprime1.com.br/image/';
  const [cliente, setCliente] = useState([]);
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [calendario, setCalendario] = useState([]);
  const [selecionado, setSelecionado] = useState('');

  useEffect(() => {
    Api.get("getUser")
      .then(response => {
        const data = response.data.res;
        const arr = Array.isArray(data) ? data : Object.values(data);
        setCliente(arr);
      })
      .catch(err => console.error("Erro ao buscar clientes:", err));
  }, []);

  async function BuscarCalendario() {
    const alertaEl = document.getElementById("Alerta");
    if (alertaEl) alertaEl.innerText = "";
    if (!selecionado || selecionado === 'selecione') {
      if (alertaEl) alertaEl.innerText = "Selecione um Cliente!";
      return;
    }
    if (!inicio || !fim) {
      if (alertaEl) alertaEl.innerText = "Defina as datas!";
    }
    try {
      const { data } = await Api.post('buscarAprovacao', { inicio, fim, tokenUser: selecionado });
      if (typeof data === 'string') {
        if (alertaEl) alertaEl.innerText = 'Selecione uma data válida';
      } else {
        setCalendario(data);
        console.log(data)
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <HeaderComponente />
      <section id="sectionAprovacao">
        <div className="containerAprovacao">
          <div className="selectClient">
            <label id="selectC">
              Selecionar Cliente:<br />
              <select value={selecionado} onChange={e => setSelecionado(e.target.value)}>
                <option value='selecione'>— Selecione o Cliente —</option>
                {cliente.map(c => (
                  <option key={c.id} value={c.token}>{c.user}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="dataCronogramaSelect">
            <label>Data de início:<br />
              <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} />
            </label>
            <label>Data de término:<br />
              <input type="date" value={fim} onChange={e => setFim(e.target.value)} />
            </label>
          </div>
          <div className="btnDiv">
            <p id="Alerta"></p>
            <button className="bntBuscarCronograma" onClick={BuscarCalendario}>Buscar</button>
          </div>
        </div>

        <div className="conteudoAprovacao">
          {calendario.map((item) => {
            let files = [];
            try {
              files = JSON.parse(item.nomeArquivos);
            } catch {
              files = [];
            }
            console.log(files)
            
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
              await Api.post('aprovarParaCliente', Data)
              
              .then((response) => {
                console.log(response)
                
                if(response.data.res === 1){
                  let display = document.querySelector(`#_${item.id}`);
                  display.style.display = 'none'
                
                  const audio = new Audio(clickSound);
                  audio.volume = 1;
                  audio.play();
                } else if(response.data.res === 0){
                  alert('conteudo imcompleto para ser aprovado!')
                } else {
                  alert('Erro ao enviar o material para o cliente, sertifique-se de que o conteudo está completo.')
                }
              }).catch((erro) => {
                console.log(erro);
              });              
            }
            //solictar ajuste ao Solcial mediua 
            async function solicitarAjuste() {
              const ajusteEl = document.querySelector(`#_-_${item.id}`).value;

              if(ajusteEl === ''){
                alert('Não esqueça de listar os ajustes!');
                return;
              }

              const Data = {
                tokenUser: item.tokenUser,
                dia: item.dia,
                mes: item.mes,
                ano: item.ano,
                ajusteCrister: ajusteEl,
              };

              console.log('Dados enviados:', Data);

              try {
                const response = await Api.post('/ajusteGestao', Data);
                console.log('Resposta do servidor:', response);

                if (response.data.res === 1) {
                  alert('Ajuste solicitado com sucesso!');
                  const audio = new Audio(clickSound);
                  audio.volume = 1;
                  audio.play();
                  let display = document.querySelector(`#_${item.id}`);
                  display.style.display = 'none'
                } else {
                  //alert('Erro ao solicitar ajuste.');
                }
              } catch (error) {
                console.error('Erro na solicitação de ajuste:', error);
                alert('Erro ao enviar ajuste. Verifique sua conexão ou fale com o suporte.');
              }
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

                <div className="conteudoArteAprovacao">
                  {/* Estático */}
                  {item.formato === 'estatico' && (
                    <img src={`${URL}${item.nomeArquivos}`} alt="arte estática" className="art" />
                  )}

                  {/* Vídeo */}
                  {item.formato === 'video' && (
                    <video src={`${URL}${item.nomeArquivos}`} controls muted className="art" />
                  )}

                  <div id={`_carrossel_${item.id}`}>
                    <p>.</p>
                  </div>

                  {/* Carrossel */}
                  {item.formato === 'carrossel' && files.length > 0 && (
                    <div
                      id={`carrossel_${item.id}`}
                      className="Carrossel flex items-center"
                      style={{ alignItems: 'center' }}
                      >
                      {/* renderiza todos os arquivos do carrossel */}
                      {files.map(file => {
                        const ext = file.split('.').pop().toLowerCase();
                        const src = URL + file;
                        if (['mp4', 'webm', 'ogg'].includes(ext)) {
                          return (
                            <video
                              key={file}
                              src={src}
                              controls
                              className="media-item video mx-2"
                              style={{ maxWidth: '100%' }}
                            />
                          );
                        } else {
                          return (
                            <img
                              key={file}
                              src={src}
                              alt={file}
                              className="media-item image mx-2"
                              style={{ maxWidth: '100%' }}
                            />
                          );
                        }
                      })}
                    </div>
                  )}

                </div>

                <div className="legendaCliente">
                    <h3>Legenda:</h3>
                    <div className="areaLegenda">
                      <p  className="legendaPublicação">
                        {item.legenda}
                      </p>
                    </div>
                </div>

                <div className="roteiroStoryCliente">
                    <h3>Instrução de roteiro Story</h3>
                    
                    <div className="SenMovie">
                        <p className="responseSendMovi"></p>
                        <label>
                            anexar PDF de roteiro, do "DIA"
                            <input  className="inputSend" type="file"/>
                        </label>
                        <button type='buttonn'  className="sendMoviBtn">Enviar</button>
                    </div>
                </div>

                <div className="BtnAprovaçãoCalendario">
                    <button id="aprovacaoAprovar" onClick={aprovarParaCliente} type="butonn">Aprovar</button>
                </div> 
                <div id="AjusteCrister" className="BtnAprovaçãoCalendario">
                  <textarea id={`_-_${item.id}`} className="areaAjusteCliente" placeholder=" Liste os ajustes"></textarea>
                   <button onClick={solicitarAjuste} type="buttonn"   className="aprovacaoAprovar">solicitar ajuste</button>
                </div>
              </div>

            );
          })}


          
        </div>
      </section>
    </>
  );
}
