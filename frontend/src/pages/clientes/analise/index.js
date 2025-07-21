import HeaderComponente from "../../../componentes/header_componente";
import './styles.css';
import { FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Api from "../../../services/api";
import clickSound from '../../../assets/music/aproved.mp3';


export default function AnaliseCliente(){
    const URL = 'https://www.acasaprime1.com.br/image/';
    // usaremos useeffectr para ao caregar a pagina buscar todas as publicações no banco dce dados.
    var [ img, setImg] = useState([]); // armazenar os arquivos 
    var [ajuste, setAjuste] = useState(""); // armazenar o ajuste a ser realizado na aplicação.
    let Data = { tokenUser: sessionStorage.getItem('token')}
    const [publicacao, setPublicacao]= useState([]);
    console.log(Data)

    useEffect(() => {
    Api.post('/buscarClineteAprovado', Data)
        .then(({ data }) => {
        // confere que veio um array
        console.log(data)
        let res =  data.res
        setPublicacao(res);
        
        })
        .catch(() => {
        alert('Não possuiu material para aprovação');
        });
    }, []); 
    console.log(publicacao)
    // funcoinalidade para dentro do .map ao renderizar cada elemento 
    //função para mostrar o campo onde o usuario pode solicitar os ajustes da publicação

    return(
        <>  
            <HeaderComponente/>
            <section id="analiseClienteSEction">
                
                <div id="containerAnaliseCliente">

                    {publicacao.map((item) => {
                        let files = [];
                        try {
                        // JSON.parse pode retornar null, string, etc.
                        const parsed = JSON.parse(item.nomeArquivos);
                        // Se parsed não for array, jogue fora e fique com []
                        if (Array.isArray(parsed)) {
                            files = parsed;
                        }
                        } catch {
                        files = [];
                        }
                        //mostrando a div com a area de ajuste 
                        async function updateContent() {
                            var ajustArea = document.querySelector(`#ajuste_${item.id}`);
                            ajustArea.style.display = "block"; 
                        };
                        //funcion para enviar o ajuste
                        async function sendUPdate() {
                            if(ajuste === ''){
                                document.querySelector(`#responseSendUpdate_${item.id}`).innerHTML = "* Preencha o campo com os ajustes!"
                            } else {
                                // realizar o envio das informaçõs ao banco de dados.
                                let Data = {
                                    dia: item.dia,
                                    mes: item.mes,
                                    ano: item.ano,
                                    tokenUser: item.tokenUser,
                                    ajusteCliente: ajuste
                                }
                                console.log(Data);
                                await Api.post('ajusteCliente', Data).then((Response) => {
                                    console.log(Response.data.res)
                                    if(Response.data.res === 1){
                                        let display = document.querySelector(`#_-_${item.id}`);
                                        display.style.display = 'none'
                                    
                                        const audio = new Audio(clickSound);
                                        audio.volume = 1;
                                        audio.play();
                                    } else{
                                        alert('Erro ao solitar o ajuste tente mais tarde!')
                                    }
                                }).catch((Erro) =>{
                                    console.log(Erro);
                                });
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
                            console.log('aprovadooooooooo');
                            // tratativas de aprovação/ com o backend + automação de publicação.
                            // rota para determinar a publicação como aprovada pelo cliente.
                            const Data = {
                                id: item.id,
                                tokenUser: item.tokenUser
                            }
                            await Api.post('/aprovacaoCliente', Data).then((response) => {
                                console.log(response.data.respostaMetaPublicacao, 'aqui');
                                alert('Seu conteúdo foi Programado')

                            }).catch((Erro) => {
                                console.log(console.error());
                                
                            })
                            const audio = new Audio(clickSound);
                            audio.volume = 1;
                            audio.play();
                            let display = document.querySelector(`#_-_${item.id}`);
                            display.style.display = 'none'
                                   
                            
                        }
                        return(
                            <div  id={`_-_${item.id}`} className="contentpublication" key={item.id}>

                                <div className="dataContent">
                                    <FaCalendarAlt size={20}/>
                                    <p className="txtDataContent">{`${item.dia}/${item.mes}/${item.ano}`}</p>
                                </div>
                                <div className="clietneFormato">
                                    <p>Tema: {item.tema}</p>
                                    <br/>
                                    <p>Formato: {item.formato}</p>
                                    <br/>
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
                                    <div className="areaLegenda">
                                        <strong><p>Legenda:</p><br/></strong>
                                        <p> {item.legenda}
                                        </p>
                                    </div>                                    
                                </div>
                                <div className="roteiroStoryCliente">
                                    <h3>Instrução de roteiro Story</h3>
                                    <p> Lembre-se de encaminhar o Vídeo seguindo o tutorial disponivel no Manual do usuário
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
                                <div id={`ajuste_${item.id}`} className="ajustecontent">
                                    <p>Descreve o ponto a ser ajustado!</p>
                                    <br/>
                                    <p className="responseSendUpdate" id={`responseSendUpdate_${item.id}`}></p>
                                    <textarea className="txtAreaAjuste" onChange={e => setAjuste(e.target.value)} placeholder="  Descreva o ponto a ser ajustado."></textarea>
                                    <buttonn type='buttonn' onClick={sendUPdate} className="solicitarAjuste">Solicitar ajuste</buttonn>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    );
};