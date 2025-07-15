import {React,   useEffect, useState } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import FooterComponente from "../../../componentes/footer_componente";
import _07 from '../../../assets/capa_Dashboard/07.webp';
import './styles.css';
import { useNavigate } from "react-router-dom";
import Api from '../../../services/api';

export default function CreateContent() {
  const URL = 'https://urchin-upright-hardly.ngrok-free.app/image/'
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
              history(`/updateMedias`);// direcionar para a pagina onde será possivel efetuar a atualização e e inserção deos materiasi tipom arte.
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
