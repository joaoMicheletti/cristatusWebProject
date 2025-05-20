import React, { use, useState } from "react";
import Api from '../../../services/api';
import './styles.css';
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
    const Hystory = useNavigate();
    // Coloque os hooks useState fora da função Login
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    // Função de login
    async function Login(e) {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        // Aqui você pode adicionar lógica para autenticação real
        if(use === "" || pass === ""){
            document.querySelector('.alerta_login').innerHTML ='* Preencha todos os campos.'

        } else {
            const Data = {
            user,
            pass
            };
            //enviar para a api e autenticar usuario
            await Api.post('/loginCrister', Data).then((response) => {
                var Response = response.data;
                console.log(Response);
                if(Response.res === 'User not found!'){
                    document.querySelector('.alerta_login').innerHTML ='Usuário não encontrado.'
                } else {
                    sessionStorage.setItem("tokenCrister", Response.res);                    
                    Hystory('/dashboardCrister')
                }
                console.log(Response.res )
            }).catch((erro) =>{
                alert("server not found");
            });
        };
        
    };

    return (
        <>
            <section id="sectionFormulario">
                <div id="divformulario">
                    <form id="formulario">
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
                        <br/>
                        <input onClick={Login} id="BtnLoginUser" type="button" value="Login"/>
                    </form>
                    <p className="alerta_login"></p>
                </div>
            </section>
        </>
    );
}
