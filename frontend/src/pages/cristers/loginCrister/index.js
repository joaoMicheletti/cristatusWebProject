import React, { use, useState } from "react";
import Api from '../../../services/api';
import './styles.css';
import { useNavigate } from "react-router-dom";
import logoLogin from '../../../assets/image/logoLogin.webp'

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
                    //remover os sessions storage:
                    sessionStorage.removeItem("tokenCrister");
                    sessionStorage.removeItem("tokenColab");
                    // direcionar colavborador para pagina de l=colaborador.
                    // direcionar crister para pagina de crister.

                    if(!response.data.res.colab){
                        console.log('ola')
                        sessionStorage.setItem("tokenCrister", response.data.res);                    
                        Hystory('/dashboardCrister')
                    }else {
                        sessionStorage.setItem("tokenColab", response.data.res.colab);                    
                        Hystory('/dashboardColab')

                    }
                    
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
                <div id="divformularioLogin">
                    <form id="formularioLoginUser">
                        <img id="logoLogin" src={logoLogin} alt="logo img" />
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
