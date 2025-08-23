import React, { useState, useEffect } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import './style.css';
import Api from '../../../services/api';
import { FaCalendarAlt } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import clickSound from '../../../assets/music/aproved.mp3'

export default function AprovacaoConteudo() {
  const URL = 'https://www.acasaprime1.com.br/image/';
  // 1. cliente inicia como array
  const [cliente, setCliente] = useState([]);
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [calendario, setCalendario] = useState([]);
  const [selecionado, setSelecionado] = useState('');
  // variável para salvar os aquivos :
  const [selectedFilesMap, setSelectedFilesMap] = useState({});
  // variavel para salvar a resposta do envio da imagem ao servidor.
  const [respostaIMG, setRespostaImg] = useState('');  
  const render = []

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

  //função para buscar o calendario. ou publicação.
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
        <div className="containerAprovacao">
          <div className="selectClient">
            <label id="selectSolicitacoes">
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
            // adaptar para mandar para area de aprovação.
            async function solicitarAprocacao() {
                let display = document.querySelector(`#_${item.id}`);
                display.style.display = 'none'
                const audio = new Audio(clickSound);
                audio.volume = 1;
                audio.play();
                // chamar função de notificação.
            };
            // criar funcionalidade para atualizar os materiais
            // eventualmente criar uma função para permitir a atualização da data da publicação.
            //função para atualizar o tema da publicação ok
            async function updateTema(){
                let newTema = document.querySelector(`#__${item.id}`).value
                console.log(newTema);
                if(newTema.length < 10){
                    alert('Sertifique-se de informar o novo tema!')
                } else {
                    // enviar o tema para o backend e efetuar a atualização.
                    const Data = {
                        tokenUser: item.tokenUser,
                        dia: item.dia,
                        mes: item.mes,
                        ano: item.ano,
                        tema: newTema
                    }
                    Api.post('updateTema', Data).then((response) =>{
                        console.log(response.data)
                        if(response.data.res === 1){
                            document.querySelector(`#_-_${item.id}`).innerHTML = newTema;
                            console.log(response.data.res)
                        } else {
                            alert('Erro ao atualizar o tema da Publicação!')
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            };
            //funçlão para atualizar o formato da publicação
            async function updateFormato(){
                console.log('formato')
                let newFormato = document.querySelector(`#_f_${item.id}`).value;
                console.log(newFormato);
                if(newFormato === 'selecionar'){
                    alert('Sertifique-se de selecionar o novo Formato!');
                } else {
                    const Data = {
                        tokenUser: item.tokenUser,
                        dia: item.dia,
                        mes: item.mes,
                        ano: item.ano,
                        formato: newFormato
                    }
                    Api.post('updateFormato', Data).then((response) =>{
                        console.log(response.data)
                        if(response.data.res === 1){
                            document.querySelector(`#_F_${item.id}`).innerHTML = newFormato;
                            console.log(response.data.res)
                        } else {
                            alert('Erro ao atualizar o tema da Publicação!')
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })                    
                };
            };
            // função para atualizar as artes da publicação.
            //async function updateMaterial(){};
            // funçãoi para atualizar a legenda da publicação;
            const handleFileChange = (id, event) => {
              const files = Array.from(event.target.files);
              setSelectedFilesMap(prev => ({
                ...prev,
                [id]: files
              }));
            };
            const handleUpload = async (item) => {
              let confimation = document.querySelector(`#_F_${item.id}`)
              console.log(confimation.value)
              const files = selectedFilesMap[item.id] || [];
              console.log('Iniciando upload para item', item.id, 'arquivos:', files);

              if (files.length === 0) {
                alert('Selecione ao menos um arquivo para upload.');
                return;
              }
              
              // valida quantidade baseada no formato
              if ((confimation.textContent === 'estatico' && files.length !== 1) ||
                  (confimation.textContent === 'carrossel' && files.length < 2)) {
                alert('Verifique a quantidade de arquivos de acordo com o formato.');
                return;
              }
              
              //heade para complementar a request
              const headers = { 
                'headers': {
                    'content-Type': 'multipart/form-data',
                }
              };
              // verificar se o aray de arquivos possui masi que um arquivo!
              // se sim execuar um loop para enviar um arquivo de cada ves ao backend.
              //variavel responsável pelo nome do arquivo.
              let nome = `${item.tokenUser}_${item.formato}-${item.dia}-${item.mes}-${item.ano}-update`
              if(files.length === 1){
                if( item.formato === 'estatico'){
                  let typeString = `${files[0].type}`;
                  if( typeString.startsWith('video/')){
                    alert('O arquivo para esse tipom de publicação deve ser uma imagem')
                  }
                }
                if( item.formato === 'video'){
                  let typeString = `${files[0].type}`;
                  if( !typeString.startsWith('video/')){
                    alert('O arquivo para esse tipom de publicação deve ser um Vídeo')
                    return
                  }
                }
                //Verificar o tamho dos arquivos de acordo com o formato.
                // para Reels - no maximo 300MB
                const MAX_REELS_BYTES = 300_000_000;        // 300 MB

                if( item.formato === 'video' ){
                  if(files[0].size > MAX_REELS_BYTES){
                    console.log('Maior')
                    alert('certifique-se de que os Vídeos para Reels tem no Maximo 300MB -')
                    return;
                  }
                }
                const formDataUnico = new FormData(); // so para deixar o nome unico para cada necessidade.
                //tipo do arquivo.
                let typeName = files[0].type
                let extensao = typeName.split('/');
                formDataUnico.append('file', files[0], nome+1+'.'+extensao[1]);
                console.log('file:', formDataUnico.getAll('file'));// opá tudo ok com o FormData.
                // enviar arquivo para o backend e salvar no anco de dados.
                await Api.post('/file', formDataUnico, headers).then( async(response) =>{
                  console.log(response);
                  // armazenar o nome do arquivo no na variavel render:
                  render.push(response.data )
                  // salvar o nome do arquivo mno banco de dados
                  // identificação da publicação atraves do dia mes ano formato e token
                  const Data = {
                    dia: item.dia,
                    mes: item.mes,
                    ano: item.ano,
                    formato: item.formato,
                    tokenUser: item.tokenUser,
                    nomeArquivos: response.data.filename
                  }
                  if(item.formato ==='estatico'){
                    // Aguardar 3 segundos sem função específica
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    let elemento2 = document.querySelector(`#video_${item.id}`)
                    console.log(elemento2)
                    elemento2.style.display = 'none'
                    let elemento = document.querySelector(`#img_${item.id}`)
                    elemento.style.display = 'block'
                    elemento.src = `https://www.acasaprime1.com.br/image/${response.data.filename}`

                  } else if(item.formato === 'video'){
                    let elemento2 = document.querySelector(`#img_${item.id}`)
                    console.log(elemento2)
                    elemento2.style.display = 'none'
                    let elemento = document.querySelector(`#video_${item.id}`)
                    elemento.style.display = 'block'
                    elemento.src = `https://www.acasaprime1.com.br/image/${response.data.filename}`
                  }

                  
                  console.log(Data)
                  await Api.post('/nameFile', Data).then((response) =>{
                    //salvar o retorno de uma responsta no useState para verificar o envio e ai sim enviar o material para aprovação 
                    console.log(response.data);
                    console.log(respostaIMG)
                    setRespostaImg(response.data);
                    console.log(render)
                    
                    
                  }).catch((Erro) => {
                    console.log('erro ao salvar o nome do material no banco de dados!!!');
                  });
                  // concluido enviar para aprovação com o botão aprovação 
                })
                
              } else if (files.length > 1){
                const meuArray = [];
                console.log(files)
                for (let i = 0; i < files.length; i++){
                  // verificar dentro do loop para garantir que todos os arquivos passe pela verificação.
                  const MAX_CAROUSEL_STORY_BYTES = 100_000_000; // 100 MB
                  if( item.formato === 'carrossel' ){
                    let typeString = `${files[i].type}`;
                    console.log(typeString.toString)
                    if( typeString.startsWith('video/')){
                      console.log('Temos um Video:', files[i].type)
                      if(files[i].size > MAX_CAROUSEL_STORY_BYTES){
                        console.log('Maior')
                        alert('certifique-se de que os Vídeos para o Carrossel tem no Maximo 300MB -')
                      return
                      };
                    };
                  };
                  let typeName = files[i].type
                  let extensao = typeName.split('/');
                  console.log(extensao)
                  const formDataMulti = new FormData();
                  formDataMulti.append('file', files[i], nome+i+'-.'+extensao[1])
                  console.log('file', formDataMulti.getAll('file'));
                  await Api.post('/file', formDataMulti, headers).then(async(response) =>{
                    console.log(response);
                    //salvar o nome no array:
                    meuArray.push(response.data.filename)
                    console.log(meuArray);
                    render.push(response.data)
                    console.log('renser aqui>>>>>', render)
                    setRespostaImg(response.data);
                  });                
                };
                const Data = {
                  dia: item.dia,
                  mes: item.mes,
                  ano: item.ano,
                  formato: item.formato,
                  tokenUser: item.tokenUser,
                  nomeArquivos: meuArray
                }
                //elemento.src = `http://127.0.0.1:3333/image/${response.data.filename}`
                
                let elemento2 = document.querySelector(`#video_${item.id}`)
                elemento2.style.display = 'none'
                let elemento = document.querySelector(`#img_${item.id}`)
                elemento.style.display = 'none'
                let carooseel = document.querySelector(`#carrossel_${item.id}`);
                carooseel.style.display = 'block'

                // criar loop para apresentação do carroseel:
                
                for (let i =0; i<render.length; i++) {
                  console.log(render[i].filename)
                  const ext = render[i].filename.split('.').pop()?.toLowerCase();     
                  const videoExts = ['mp4', 'webm', 'ogg'];
                  let componente = document.querySelector(`#carrossel_${item.id}`)

                  if (ext && videoExts.includes(ext)) {
                    console.log('vide aui',render, render[i].filename)
                    componente.innerHTML += `<video style="width:100%" margin-left:0%" autoPlay={false}  muted={false} controls className="rendervideo"`+`type="video/mp4"`+`src="${URL}${render[i].filename}">`+`</video>`
                  } else {
                    console.log('foto aqui');
                    componente.innerHTML += `<br/><img style="width:100%" height:80% margin-left:0%" `+`src="${URL}${render[i].filename}" alt="teste"/>`
                  }
                }
                         

                await Api.post('/nameFile', Data).then((response) =>{
                  console.log(response)
                  
                  console.log(render)
                }).catch((Erro) => {
                  console.log('erro ao salvar o nome do material no banco de dados!!!');
                });
                  // concluido enviar para aprovação com o botão aprovação

              }

              //console.log(files, 'files here') // tudo ok mostra normal os meus aquivos 
              //console.log('files:', formData.getAll('files'));// para mostrar os arquivos do formadata 
              //await Api.post('/file', formData, headers).then((response) =>{
                //console.log(response);
              //})
              
            };
            async function updateLegenda(){
                let newlegenda = document.querySelector(`#_l_${item.id}`).value
                console.log(newlegenda)
                if(newlegenda.length < 100){
                    alert('Sertifique-se de informar a nova Legenda!')
                } else {
                    // enviar o tema para o backend e efetuar a atualização.
                    const Data = {
                        tokenUser: item.tokenUser,
                        dia: item.dia,
                        mes: item.mes,
                        ano: item.ano,
                        legenda: newlegenda
                    }
                    Api.post('updateLegenda', Data).then((response) =>{
                        console.log(response.data)
                        if(response.data.res === 1){
                            document.querySelector(`#_L_${item.id}`).innerHTML = newlegenda;
                            console.log(response.data.res)
                        } else {
                            alert('Erro ao atualizar o tema da Publicação!')
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            };
            // função para atualizar o material dos Storys OBS nao definido o formato "StandBy"


            
            return(

              <div className="contentpublication" id={`_${item.id}`}  key={item.id} >
                
                <div className="dataContent">
                    <FaCalendarAlt size={20}/>
                    <p className="txtDataContent">{`${item.dia}/${item.mes}/${item.ano}`}</p>
                </div>

                <div id="temaAjuste" className="coteudoArte">
                    <label>
                        Tema:
                        <h3 id={`_-_${item.id}`}>{item.tema}</h3>
                        <br/>
                    </label>
                    <div id="temaUpdate">
                        <input id={`__${item.id}`} className="inputTemaAjuste" type="text" placeholder=" Novo tema."/>
                        <button onClick={updateTema} className="btnAjustes">atualizar</button>
                    </div>

                </div>

                <div id="formatoUpdate" className="coteudoArte">
                    <label>
                        Formato:
                        <h3 id={`_F_${item.id}`} >{item.formato}</h3>
                    </label>
                    <div  className="updateFormato">
                        <select id={`_f_${item.id}`}>
                            <option value="selecionar">Selecionar</option>
                            <option value="carrossel" >Carrossel</option>
                            <option value="estatico" >Estático</option>
                            <option value="video" >Vídeo</option>
                        </select>
                        <button onClick={updateFormato} className="btnAjustes">atualizar</button>
                    </div>
                </div>

                
                <div className="redeImg">
                  <img className="imgREnder" id={`img_${item.id}`} alt="teste" src=""/>
                  <video autoPlay={false}  muted={false} controls className="rendervideo" id={`video_${item.id}`} type="video/mp4"  src=""></video>
                </div>

                <div id={`carrossel_${item.id}`} className="carrossel">
                                    
                </div>

                <div className="coteudoArquivos">
                  <input id={`__${item.id}`} 
                    type="file" multiple 
                    onChange={e => handleFileChange(item.id, e)}
                  />
                  <button type="button" 
                    placeholder='Salvar aquivos'
                    onClick={() => handleUpload(item)}
                  >Salvar material</button>
                </div>
        
                
        
                <div  className="legendaCliente">
                    <h3  >Legenda:</h3>
                    <div id="areaLegenda">
                        <p id={`_L_${item.id}`}>
                            {item.legenda}
                        </p>
                    </div>
                    <div className="updateLegenda">
                        <textarea id={`_l_${item.id}`} rows='20'  placeholder=" Nova Legenda"></textarea>
                        <button onClick={updateLegenda} className="btnAjustes">atualizar</button>
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
                    <button id="aprovacaoAprovar" onClick={solicitarAprocacao} type="butonn">Solicitar Aprovação</button>
                </div> 
              </div>

            );
          })}


          
        </div>
      </section>
    </>
  );
}
