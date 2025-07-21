import {React,   useEffect, useState } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import _07 from '../../../assets/capa_Dashboard/user.webp';
import './styles.css';
import { useNavigate } from "react-router-dom";
import Api from '../../../services/api';

export default function CreateContent() {
  const URL = "https://www.acasaprime1.com.br/image/"
  const history = useNavigate();
  // ① inicializa como array
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.get('/listarClientes')
      .then(({ data }) => {
        // confere que veio um array
      setUsers(data.response);
      
      })
      .catch(() => {
        alert('Erro interno.');
      });
  }, []); // roda só uma vez
console.log(users)
  return (
    <>
      <HeaderComponente/>
      <section id="sectionCreateContent">
        <h1 className="titleCreateContent">
          Clientes Cristers
        </h1>
        <div id="clientesContainer">
          {users.map((u, index) => {
            function redirect() {
              localStorage.setItem('referenciaCliente', u.token);
              history(`/calendario`);
            }
            return (
              <div className="cardDashCrister" key={index}>
                <div onClick={redirect} className="card-img">
                  <img src={`${u.foto}`} alt={`Card ${index + 1}`} className="card-img-inner" />
                </div>
                {/* mostra a propriedade que você quiser */}
                <p className="card-description">{u.user}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
