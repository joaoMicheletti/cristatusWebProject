import {React, useEffect, useState } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import './style.css';
import Api from '../../../services/api.js';


export default function AdmCliente() {
    const [acessosMAp, setAcessosMap] = useState([]);
    let Data = {token: sessionStorage.getItem('token')};
    useEffect(()=>{
        Api.post('acessosGet', Data).then((response) => {
            setAcessosMap(response.data.res);
        }).catch((Erro) => {
            console.log(Erro);
        })
    }, [acessosMAp])
  // Placeholder data arrays; substitute com dados reais
  const notasFiscais = [
    { id: 1, title: 'NF-001', description: 'Descrição da nota 001' },
    { id: 2, title: 'NF-002', description: 'Descrição da nota 002' },
    { id: 3, title: 'NF-003', description: 'Descrição da nota 003' }
  ];
  const contratos = [
    { id: 1, title: 'Contrato A', description: 'Descrição do Contrato A' },
    { id: 2, title: 'Contrato B', description: 'Descrição do Contrato B' },
    { id: 3, title: 'Contrato C', description: 'Descrição do Contrato C' }
  ];
  const atas = [
    { id: 1, title: 'Ata 01', description: 'Resumo da Ata 01' },
    { id: 2, title: 'Ata 02', description: 'Resumo da Ata 02' },
    { id: 3, title: 'Ata 03', description: 'Resumo da Ata 03' }
  ];

  // Estados de controle de cada carousel
  const [indexNF, setIndexNF] = useState(0);
  const [indexContratos, setIndexContratos] = useState(0);
  const [indexAtas, setIndexAtas] = useState(0);

  // Funções para navegar
  const prev = (type) => {
    if (type === 'nf') {
      setIndexNF((prev) => (prev === 0 ? notasFiscais.length - 1 : prev - 1));
    } else if (type === 'contrato') {
      setIndexContratos((prev) => (prev === 0 ? contratos.length - 1 : prev - 1));
    } else {
      setIndexAtas((prev) => (prev === 0 ? atas.length - 1 : prev - 1));
    }
  };
  
  const next = (type) => {
    if (type === 'nf') {
      setIndexNF((prev) => (prev === notasFiscais.length - 1 ? 0 : prev + 1));
    } else if (type === 'contrato') {
      setIndexContratos((prev) => (prev === contratos.length - 1 ? 0 : prev + 1));
    } else {
      setIndexAtas((prev) => (prev === atas.length - 1 ? 0 : prev + 1));
    }
  };

  // Render de um slide genérico
  const renderSlide = (item) => (
    <div className="slide" key={item.id}>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  );

  // FUNCTION PARA SALVAR OM ACESSO NO DATABASE:
  // estados para manuzear os inputs:
  const [plataforma, setPlataforma] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  async function acessos(){
    const Data = {
    plataforma, email, senha, token: sessionStorage.getItem('token')
    };
    console.log(Data);
    if(plataforma === '' || email === '' || senha === ''){
        alert('Preencha os campos com os Acessos!')
    } else {
        // insert in database this acess:
        await Api.post('acessosCreate', Data).then((response) => {
            console.log(response.data.res);
            if(response.data.res === 'Acesso cadastrado com sucesso!'){
                alert("Acesso salvo com sucesso!")
            }
        }).catch((erro) =>{
            console.log(erro);
        });
    }
  };

  return (
    <>
      <HeaderComponente />
      <section id="AdmCliente">
        <p id="tituloAdmCliente">Administrativo</p>

        {/* Carousel de Notas Fiscais */}
        <div className="carousel-container">
          <p>Notas Fiscais</p>
          <div className="carousel">
            <button className="nav prev" onClick={() => prev('nf')}>&lt;</button>
            {renderSlide(notasFiscais[indexNF])}
            <button className="nav next" onClick={() => next('nf')}>&gt;</button>
          </div>
        </div>

        {/* Carousel de Contratos */}
        <div className="carousel-container">
          <p>Contratos</p>
          <div className="carousel">
            <button className="nav prev" onClick={() => prev('contrato')}>&lt;</button>
            {renderSlide(contratos[indexContratos])}
            <button className="nav next" onClick={() => next('contrato')}>&gt;</button>
          </div>
        </div>

        {/* Carousel de Atas de Reunião */}
        <div className="carousel-container">
          <p>Atas de Reunião</p>
          <div className="carousel">
            <button className="nav prev" onClick={() => prev('ata')}>&lt;</button>
            {renderSlide(atas[indexAtas])}
            <button className="nav next" onClick={() => next('ata')}>&gt;</button>
          </div>
        </div>


        <div className="carousel-container">
            Area restrita - "Acessos"
            <div id="divAcessos">
                <input className="inputAcesso" 
                    type="text" 
                    placeholder="plataforma"
                    onChange={(e) => setPlataforma(e.target.value)}
                />
                <br/>
                <input className="inputAcesso" 
                    type="text" 
                    placeholder="  E-mail / Contato / Usuário "
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <input className="inputAcesso" 
                    type="text" 
                    placeholder="  Senha / Password"
                    onChange={(e) => setSenha(e.target.value)}
                /><br/>
                <input onClick={acessos} className="inputAcesso" type="button" value='Salvar acesso'/>
            </div>
            <div id="resultsAcessos">
                {acessosMAp.map((item)=>{
                    return(
                        <div className="acesso" key={item.id}>
                            <p>{item.plataforma}</p>
                            <p>E-mail: {item.email}</p>
                            <p>Senha: {item.senha}</p>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="carousel-container">
            <p>Pagamento criar logica para abranger varios produtos a serem cobrados se contratados.</p>
        </div>
      </section>
    </>
  );
}
