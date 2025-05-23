import React, { useState } from "react";
import './styles.css';
import HeaderComponent from '../../../componentes/header_componente';
import FooterComponente from "../../../componentes/footer_componente";
import Api from '../../../services/api';
import { FaCalendarAlt } from "react-icons/fa";
import clickSound from '../../../assets/music/aproved.mp3'

export default function Calendario() {
    var [ img, setImg] = useState([]);
    //datas inicio e termino
    const [inicio, setInicio] = useState('');
    const [termino, setTermino] = useState('');
    //buscando calendario:
    const [calendario, setCalendario] = useState([]);

    async function criarCronograma() {
        const respEl = document.querySelector("#respCrono");

        if (!inicio || !termino) {
            respEl.innerHTML = 'Defina uma data de início e data de término!';
            return;
        }

        // Parse de forma a evitar problemas de timezone
        const [yI, mI, dI] = inicio.split('-');
        const [yT, mT, dT] = termino.split('-');
        const dataInicio = new Date(Number(yI), Number(mI) - 1, Number(dI));
        const dataTermino = new Date(Number(yT), Number(mT) - 1, Number(dT));
        //console.log(dataInicio.getDate(), dataTermino)

        if (dataTermino < dataInicio) {
            respEl.innerHTML = 'A data de término não pode ser anterior à data de início.';
            return;
        }

        // Cálculo da diferença em dias (inclui dia inicial)
        const diffTime = dataTermino.getTime() - dataInicio.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Gerar array de datas
        const datesArray = [];
        for (let dt = new Date(dataInicio); dt <= dataTermino; dt.setDate(dt.getDate() + 1)) {
            datesArray.push({
                day: dt.getDate(),
                month: dt.getMonth() + 1,
                year: dt.getFullYear()
            });
        }

        respEl.innerHTML = `Existem ${diffDays} dia${diffDays > 1 ? 's' : ''} entre as datas.`;
        console.log('Data Início (local):', dataInicio);
        console.log('Data Término (local):', dataTermino);
        console.log('Dias de diferença:', diffDays);
        console.log('Array de datas:', datesArray);
        console.log(datesArray)
        // criando o calendario na banco de ados.
        // 
        var cont = 0;
        while (cont < diffDays){
            let Data = {
                dia: datesArray[cont].day,
                mes: datesArray[cont].month,
                ano: datesArray[cont].year,
                tokenUser: localStorage.getItem('referenciaCliente'),
            };
            //antes de craira de fato  o cronograma vamos verifiacar se já nao possui a data cadastrrada no calendario editoria
            await Api.post("buscarData", Data).then((responseBuscarData) => {
                console.log(responseBuscarData);
                if(responseBuscarData.data.res > 0){
                    respEl.innerHTML = "verifique as datas, parece que ja foi criado um cronograma com essas datas para esse Usuário";
                } else if(responseBuscarData.data.res === 0){
                    // inserids no banco de dados:
                    async function insert() {              
                        await Api.post('/createCalendar', Data).then((response) =>{
                        console.log(response);
                        if(response.data.res === 1){
                            return;
                        } else {
                            respEl.innerHTML = 'Erro ao Crair Calendário editorial.';
                            cont +=diffDays
                        }
                        }).catch((Erro) => {
                            console.log(Erro);
                        });
                    }; 
                    insert(); // chamado a função de insert --- gambiarra. no momento é oque deu kkkk                  
                };

            }).catch((Erro) => {
                console.log(Erro);
            })
            console.log(Data);
            /*
            */

            cont +=1
        };

        //buscar às infomações dadastradas para dar continuidade na criação do calendario editorial:
        //criar rota na aolicação backend e buscar o periudo iicial ao final fazer .map para listar e dar continuidade nas demasi funções.
        //console.log(dataInicio.getDate(), dataTermino)
        let Data = {
            inicio: `${dataInicio.getDate()}-${dataInicio.getMonth()+1}-${dataInicio.getFullYear()}`,
            fim: `${dataTermino.getDate()}-${dataTermino.getMonth()+1}-${dataTermino.getFullYear()}`,
            tokenUser: localStorage.getItem('referenciaCliente')
        };
        await Api.post("/buscarCalendario", Data).then((resposne) => {
            console.log(resposne.data.res)
            setCalendario(resposne.data.res);

        }).catch((Erro)=>{
            console.log(Erro);
        })
        console.log(Data)
    }
    console.log(calendario);
    // enviar arquivo:
    async function sendMovi() {
        console.log(img.length)
        if(img.length === 0){
            document.querySelector('.responseSendMovi').innerHTML = "* Selecione um arquivo!"
        };    
    };
    

    
    return (
        <>
            <HeaderComponent />
            <section id="calendarioConteudo">
                <h1>Calendário editorial</h1>
                <div id="containerCalendario">
                    <div id="initEndContent">
                        <label className="labelCalendarioCriar">
                            Data de início:
                            <input
                                className="dateInput"
                                type="date"
                                value={inicio}
                                onChange={e => setInicio(e.target.value)}
                            />
                        </label>
                        <label className="labelCalendarioCriar">
                            Data de término:
                            <input
                                className="dateInput"
                                type="date"
                                value={termino}
                                onChange={e => setTermino(e.target.value)}
                            />
                        </label>
                        <input
                            onClick={criarCronograma}
                            id="btnCalendaroCriar"
                            type="button"
                            value="Criar"
                        />
                    </div>
                    <p id="respCrono"></p>
                </div>

                <div id="containerCalendarioCreate">
                    {calendario.map((conteudo, index) => {
                        let tema = ''; // armazenando o tema;
                        let formato = ''; // armazenando o valor do select 
                        let legenda = ''; // armazendando a Legenda da publicação;
                        
                        
                        // mandar conteúdo para aprovação :
                        // aprovação /mandar para o lead:
                        async function aprovedContent() {
                            if (tema === ''){
                                alert('Defina o tema da Publicação!')

                            }else if(formato === 'selecionar' || formato ===''){
                                alert('Selecione o Formato da Publicação!')
                            } else if(legenda === ''){
                                alert("forneça a lengenda da publicação");
                            } else {
                                
                                // tratativas de aprovação/ com o backend + automação de publicação.
                                let Data = {
                                    dia: conteudo.dia, mes: conteudo.mes, ano: conteudo.ano, tokenUser:localStorage.getItem('referenciaCliente'), aprovadoCristar: "aguardando",
                                    tema, formato, legenda, };
                                console.log(Data)
                                await Api.post('enviarAprovacao', Data).then((resposne) => {
                                    console.log(resposne); 
                                    let display = document.querySelector(`#_${conteudo.id}`);
                                    display.style.display = 'none'
                                
                                    const audio = new Audio(clickSound);
                                    audio.volume = 1;
                                    audio.play();

                                }).catch((Erro) => {
                                    console.log("erro interno");
                                });
                            };
                        }
                        return(
                            <div className="contentpublication" id={`_${conteudo.id}`} key={index}>
                
                                <div className="dataContent">
                                    <FaCalendarAlt size={20}/>
                                    <p className="txtDataContent">{conteudo.dia+"/"+conteudo.mes+"/"+conteudo.ano}</p>
                                </div>
                                <div className="coteudoArte">
                                    <label>
                                        Tema:
                                        <input className="slectFormato" id={`t${index}`}
                                            placeholder=" * TEMA"
                                            onChange={e=> tema = e.target.value }
                                        />
                                    </label>
                                </div>
                        
                                <div className="coteudoArte">
                                    <label>
                                        Formato
                                        <select className="slectFormato" id={`_${index}`}
                                            onChange={e => formato = e.target.value} >
                                            <option value='selecionar'>Selecione um formato</option>
                                            <option value='estatico'>Estático</option>
                                            <option value='carrossel'>Carrossel</option>
                                            <option value='video'>Vídeo</option>
                                        </select>
                                    </label>
                                </div>
                        
                                <div className="legendaCliente">
                                    <h3>Legenda:</h3>
                                    <textarea onChange={e => legenda = e.target.value} rows={15} className="legendaPublicação" 
                                    placeholder={conteudo.legenda}>
                                    </textarea>
                                </div>
                                <div className="roteiroStoryCliente">
                                    <h3>Instrução de roteiro Story</h3>
                                    
                                    <div className="SenMovie">
                                        <p className="responseSendMovi"></p>
                                        <label>
                                            anexar PDF de roteiro, do "DIA"
                                            <input  className="inputSend" type="file"/>
                                        </label>
                                        <buttonn type='buttonn'  onClick={sendMovi} className="sendMoviBtn">Enviar</buttonn>
                                    </div>
                                </div>
                                <div className="BtnAprovação">
                                    <buttonn type="buttonn" onClick={aprovedContent} className="btnAprova" >Aprovação</buttonn>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </section>
            <FooterComponente />
        </>
    );
};