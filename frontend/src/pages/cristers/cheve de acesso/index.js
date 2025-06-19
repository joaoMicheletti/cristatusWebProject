import React, { useState } from "react";
import HeaderComponente from "../../../componentes/header_componente";
import "./styles.css";
import Api from "../../../services/api";

export default function ChaveAcesso() {
  const [chave, setChave] = useState("");

  async function updateChave() {
    if (!chave) {
      alert("Por favor, insira uma chave antes de atualizar.");
      return;
    }

    try {
      const response = await Api.post("/createToken", { token:chave });
      console.log(response)
      if(response.data === 1){
        alert('Chave atualizada com sucesso')
      }
    } catch (error) {
      console.error(error);
      alert("Erro na atualização da chave.");
    }
  }

  return (
    <>
      <HeaderComponente />
      <section id="containerChave">
        <div id="DivFormChave">
          <h1>Chave de acesso - Publicações</h1>
          <label>
            Chave de acesso <br />
            <input
              type="text"
              placeholder="Digite sua chave de acesso"
              value={chave}
              onChange={(e) => setChave(e.target.value)}
            />
          </label>
          <button onClick={updateChave}>Atualizar chave de acesso</button>
          <p>
            <strong>OBS:</strong> Toda e qualquer alteração nesta chave impactará
            diretamente na automação das publicações. <br />
            <strong>Manuseie com cuidado!</strong>
          </p>
        </div>
      </section>
    </>
  );
}
