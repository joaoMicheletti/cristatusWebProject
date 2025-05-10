import React, { useState } from "react";
import Api from '../../services/api';
import './styles.css';

export default function LoginUser() {
    // Coloque os hooks useState fora da função Login
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    // Função de login
    async function Login(e) {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        // Aqui você pode adicionar lógica para autenticação real
        const Data = {
            user,
            pass
        };
        //enviar para a api e autenticar usuario
        await Api.post('/loginUser', Data).then((response) => {
            var Response = response.data;
            console.log(Response)
        }).catch((erro) =>{
            alert("server not found");
        });
    };

    return (
        <>
            <section id="sectionFormulario">
                <div id="divformulario">
                    <form id="formulario" onSubmit={Login}>
                        <h1 className="titleloginUser">Crister Login</h1>
                        <input
                            onChange={(e) => setUser(e.target.value)}
                            className="inputLoginCrister"
                            placeholder="  *User"
                            type="text"
                            value={user}
                            required
                        />
                        <input
                            onChange={(e) => setPass(e.target.value)}
                            className="inputLoginCrister"
                            placeholder="  *Password"
                            type="password"
                            value={pass}
                            required
                        />
                        <button className="buttonLoginUser" type="submit">Login</button>
                    </form>
                    <p className="alerta_login"></p>
                </div>
            </section>
        </>
    );
}
