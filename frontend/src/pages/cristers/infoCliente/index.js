import React, { useState, useEffect, use } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import Api from '../../../services/api';
import './styles.css';

export default function InfoCliente() {
  const [cliente, setCliente] = useState([]);
  const [selecionado, setSelecionado] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState([]);
  const [senha, setSEnha] = useState('');
  const [fatura, setFatura] = useState('');
  const [hora, setHora] = useState('');

  useEffect(() => {
    Api.get("getUser")
      .then(response => {
        const data = response.data.res;
        const arr = Array.isArray(data) ? data : Object.values(data);
        setCliente(arr);
      })
      .catch(err => console.error("Erro ao buscar clientes:", err));
  }, []);

  async function BuscarCliente() {
    if(selecionado === 'selecione'){
        alert('selecione um Cliente');
        return
    }
    console.log('aqui', cliente, selecionado);
    let Data = {token: selecionado}
    Api.post("getOne", Data).then((response) => {
        const arr = Array.isArray(response.data) ? response.data : Object.values(response.data);
        setClienteSelecionado(arr);
        console.log(response.data);
        console.log(clienteSelecionado)
    }).catch((err) => {
        console.log(err);
    })
  }

  async function updateSenha(){
    console.log('updateSenha',senha)
    if(senha === ''){
        alert("Defina a nova Senha!")
        return;
    } else {
        let Data = {
            token: clienteSelecionado[0][0].token,
            pass: senha
        }
        console.log(Data)
        await Api.post('updateSenhaUser', Data).then((response) => {
            alert(response.data.res)
        }).catch((Erro) => {
            console.log(Erro);
        });
    };
  };

  async function updateFaturamento() {
    if(fatura === '') {
        alert('feina  uma data!');
        return
    };
    let sep = fatura.split('-');
    let dia = sep[2]
    let Data = {
        token:  clienteSelecionado[0][0].token,
        diaVencimento: parseInt(dia)
    };
    console.log(Data)
    await Api.post('updateFaturamento', Data).then((response) => {
        alert(response.data.res);
    }).catch((erro) =>{
        console.log(erro)
    })
    
  };

  async function updateHora() {
    if(hora === ''){
        alert('Defina um horário!');
        return;
    }
    let sep = hora.split(':');
    let Hora = sep[0];
    let Data = {
        token: clienteSelecionado[0][0].token,
        horario: Hora 
    };
    await Api.post('updateHora', Data).then((response) => {
        alert(response.data.res);
    }).catch((Erro) => {
        console.log(Erro);
    })
    console.log(Data)
    
  };



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
          <div className="btnDiv">
            <p id="Alerta"></p>
            <button className="bntBuscarCronograma" onClick={BuscarCliente}>Buscar</button>
          </div>
        </div>
        <div id="ContainerGetOne">
            {Array.isArray(clienteSelecionado) && clienteSelecionado.length > 0 ? (
                
            clienteSelecionado[0].map((item, index) => (
                // seu conteúdo aqui
                    <div id="One" key={index}>
                        <label id="nome">
                            Cliente / usuário: {item.user}
                        </label>
                        <div className="OneDiv">
                            <label>
                                Senha<br/>
                                <input id="senha" 
                                    onChange={e => setSEnha(e.target.value)}
                                    placeholder={item.pass}
                                />
                            </label>
                            <button onClick={updateSenha}>Editar</button>
                        </div>
                        <div className="OneDiv">
                            <label>
                                Data Faturamento<br/>
                                <input onChange={e => setFatura(e.target.value)} id="fatura" type="date"/>
                            </label>
                            <button onClick={updateFaturamento}>Editar</button>
                        </div>
                        <div className="OneDiv">
                            <label>
                                Horário de Publicações<br/>
                                <input onChange={e=> setHora(e.target.value)} id="hora" type="time"/>
                            </label>
                            <button onClick={updateHora}>Editar</button>

                        </div>
                    </div>
            ))
            ) : (
            <p>Nenhum cliente carregado.</p>
            )}
        </div>
      </section>
    </>
  );
}
