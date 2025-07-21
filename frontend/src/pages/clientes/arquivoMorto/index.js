import HeaderComponente from "../../../componentes/header_componente";
import './styles.css';
import { FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Api from "../../../services/api";


export default function AnaliseCliente(){
    const URL = 'https://www.acasaprime1.com.br/image/';
    // usaremos useeffectr para ao caregar a pagina buscar todas as publicações no banco dce dados.
    let Data = { tokenUser: sessionStorage.getItem('token')}
    const [publicacao, setPublicacao]= useState([]);
    console.log(Data)

    useEffect(() => {
    Api.post('/arquivoMorto', Data)
        .then(({ data }) => {
        // confere que veio um array
        console.log(data)
        let res =  data.res
        setPublicacao(res);
        
        })
        .catch(() => {
        alert('Não possuiu nenum material para ser aprovado');
        });
    }, []); 
    console.log(publicacao)
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
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    );
};