import React, { useState } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import './styles.css';
import Api from '../../../services/api';
import { FaCalendarAlt } from "react-icons/fa";
import clickSound from '../../../assets/music/aproved.mp3'
import { FaSyncAlt } from 'react-icons/fa';

export default function AprovacaoConteudo() {
  // url de imagens 
  const URL = 'https://www.acasaprime1.com.br/image/';
  // variavel para salvar a resposta do envio da imagem ao servidor.
  const [respostaIMG, setRespostaImg] = useState('');  
  // 1. cliente inicia como array
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [calendario, setCalendario] = useState([]);
  const [legenda, setLegenda] = useState('');
  // variável para salvar os aquivos :
  const [selectedFilesMap, setSelectedFilesMap] = useState({});
  // arrey de nome de imagend  para renderia-las na tela apos o upload.
  const render = [];

  async function BuscarCalendario() {
    document.querySelector("#Alerta").innerText = " ";
    if (!inicio || !fim) {
      document.querySelector("#Alerta").innerText = "Defina as datas!";
      //return;
    }

    try {
      const { data } = await Api.post('buscarUpdateMidia', {
        inicio,
        fim,
        tokenUser: localStorage.getItem('referenciaCliente')
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
            
            // funcão para enviar os arquivos para o  banco de dados:
            const handleFileChange = (id, event) => {
              const files = Array.from(event.target.files);
              setSelectedFilesMap(prev => ({
                ...prev,
                [id]: files
              }));
            };
            const handleUpload = async (item) => {
              
              const files = selectedFilesMap[item.id] || [];
              console.log(files)
              console.log('Iniciando upload para item', item.id, 'arquivos:', files);

              if (files.length === 0) {
                alert('Selecione ao menos um arquivo para upload.');
                return;
              }
              // valida quantidade baseada no formato
              if ((item.formato === 'estatico' && files.length !== 1) ||
                  (item.formato === 'carrossel' && files.length < 2)) {
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
              let nome = `${item.tokenUser}_${item.formato}-${item.dia}-${item.mes}-${item.ano}-`
              console.log(nome)
              console.log('quantidade de arquivos.',files.length)
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
                  render.push(response.data)
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
                  console.log(Data)
                  if(item.formato ==='estatico'){
                    let elemento2 = document.querySelector(`#video_${item.id}`)
                    console.log(elemento2)
                    elemento2.style.display = 'none'
                    let elemento = document.querySelector(`#img_${item.id}`)
                    console.log(elemento, 'elemento aqui pelo amor de deus ');
                    elemento.style.display = 'block'
                    elemento.src = `${URL}${response.data.filename}`

                  } else if(item.formato === 'video'){
                    let elemento2 = document.querySelector(`#img_${item.id}`)
                    console.log(elemento2)
                    elemento2.style.display = 'none'
                    let elemento = document.querySelector(`#video_${item.id}`)
                    elemento.style.display = 'block'
                    let animation = document.querySelector('.animate-spin');
                    animation.style.display = 'none'
                    
                    console.log(elemento2.src)
                    elemento.src = `${URL}${response.data.filename}`
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
                console.log('Aqui é maior que 1')
                const meuArray = [];
                console.log(files)
                for (let i = 0; i < files.length; i++){
                  console.log('Aqui esrtamos dentro do loop', item.formato, files[i].type, files[i].size)
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
                    console.log('vide aqui',render, render[i].filename)
                    componente.innerHTML += `<video style="width:80%; height:50%; margin-left:10%" autoPlay={false}  muted={false} controls className="rendervideo"`+`type="video/mp4"`+`src="${URL}${render[i].filename}">`+`</video>`
                  } else {
                    console.log('foto aqui');
                    componente.innerHTML += `<br/><img style="width:80%; height:80%; margin-left:10%" `+`src="${URL}${render[i].filename}" alt="teste"/>`
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
            //enviar o material para aprovação:
            async function solicitarAprovacaoTime() { // funcionalidade da função atualizada pra enviar o material para aprovação.
              console.log('aqui')
              let Data = {
                dia: item.dia,
                mes: item.mes,
                ano: item.ano,
                tokenUser: item.tokenUser,
              };
              console.log(Data, respostaIMG);
              if(respostaIMG === ''){
                alert('a publicação só ira para aprovação após efetuarem o upload das artes/videos')
              } else {
                console.log(respostaIMG);
                 // crair uma variavel que vai determinar se os arquivos foram enviados antes de permitir alterar o campo art no data base.
                await Api.post('/solicitarAprovacaoTime', Data)
                .then((response) => {
                  console.log(response)
                  if(response.data.res === 1){
                    const audio = new Audio(clickSound);
                    audio.volume = 1;
                    audio.play();
                    let display = document.querySelector(`#_${item.id}`);
                    display.style.display = 'none'
                  }
                  }).catch((erro) => {
                    console.log(erro);
                });
              }
                            
            }
            
            async function updateLegenda() {
              if(legenda === ''){
                alert('Preencha a lengenda!')
              } else {
                let Data = {
                  id: item.id,
                  legenda 
                };
                await Api.post('legendaUnica', Data).then((response) => {
                  console.log(response)
                  if(response.data.res === 'salva'){
                    alert('Leganda salva com sucesso.')
                  }
                }).catch((Erro) => {
                  alert('Erro ao registra a legenda')
                })   
              }
                            
            };
                       
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
                <div id="descricaoArte">
                  <h3>Arte descrição:</h3><br/>
                  <p>{item.descricaoArte}</p>
                </div>
                
                <div className="redeImg">
                  <img className="imgREnder" id={`img_${item.id}`} alt="teste" />
                  <FaSyncAlt className="animate-spin" color="white"/>
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
                
                <div id="descricaoArte">
                  <h3>Legenda descrição:</h3><br/>
                  <p>{item.descricaoArte}</p>
                </div>
                <div className="legendaCliente">
                    <h3>Legenda:<p id="LEGENDAR"></p> </h3>
                    <textarea onChange={e => setLegenda(e.target.value)} rows={15} className="legendaPublicação" 
                      placeholder={item.legenda}>
                    </textarea>
                </div>
                <input id="buttonLegenda" type="button" value="Salvar Legenda" onClick={updateLegenda}/>

                

                <div className="BtnAprovaçãoCalendario">
                    <button className="aprovacaoAprovar" onClick={solicitarAprovacaoTime} type="buttonn">Solicitar aprovação</button>
                </div>
              </div>

            );
          })}


          
        </div>
      </section>
    </>
  );
}
