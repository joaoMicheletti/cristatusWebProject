import React, { useState, useEffect, use } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import Api from '../../../services/api';
import './styles.css';
import { data } from "react-router-dom";

export default function InfoCliente() {
  const [senha, setSEnha] = useState('');
  const [cSenha, setCSenha] = useState('');

  

  async function updateSenha(){
    console.log('updateSenha',senha)
    if(senha === ''){
        alert("Defina a nova Senha!")
        return;
    } else if(cSenha === ''){
        alert('confirme sua Senha!')
    } else if(senha === cSenha) {
        let Data = {
            token: sessionStorage.getItem('token'),
            pass: senha
        }
        console.log(Data)
        await Api.post('updateSenhaUser', Data).then((response) => {
            
            if(response.data.res === 1){
                alert('Senha atualizada com sucesso');
            }
        }).catch((Erro) => {
            console.log(Erro);
        });
    };
  };

  return (
    <>
      <HeaderComponente />
      <section id="sectionAprovacao">
        <div id="One" >
            <div className="OneDiv">
                <label>
                    Senha<br/>
                    <input type="password" onChange={e => setSEnha(e.target.value)}/>
                    
                </label>
            </div>
            <div className="OneDiv">
                <label>
                    Confirmar Senha<br/>
                    <input type="password" onChange={e => setCSenha(e.target.value)}/>
                </label>
                
            </div>
            <div className="OneDiv">
                <button onClick={updateSenha}>Editar</button>
            </div>
        </div>
      </section>
    </>
  );
}
