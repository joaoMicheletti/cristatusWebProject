import {React, useState } from "react";
import Api from '../../../services/api';
import './styles.css';
import { useNavigate } from "react-router-dom";
import logoLogin from '../../../assets/image/logoLogin.webp'
import { FaFacebookSquare } from "react-icons/fa";


export default function LoginUser() {
    const Hystory = useNavigate();
    // Coloque os hooks useState fora da função Login
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    

    // Função de login
    async function Login(e) {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        // Aqui você pode adicionar lógica para autenticação real
        if(user === "" || pass === ""){
            document.querySelector('.alerta_login').innerHTML ='* Preencha todos os campos.'

        } else {
            const Data = {
            user,
            pass
            };
            //enviar para a api e autenticar usuario
            await Api.post('loginUser', Data).then((response) => {
                var Response = response.data;
                console.log('aqui:', Response.res)
                if(Response.res === 'Usuário ou Senha incorreto!'){
                    document.querySelector('.alerta_login').innerHTML ='Usuário não encontrado.'
                } else {
                    sessionStorage.setItem("token", Response.res);                    
                    Hystory('/dashboardCliente')
                };
            }).catch((erro) =>{
                alert("server not found");
            });
        };
        
    };

    // InstagramLoginButton.tsx
    const empresaCNPJ = sessionStorage.getItem('tokenCrister')
    const clientId = '3117860508390563';
    const redirectUri = 'http://localhost:3333/callback'; // configure no Facebook Dev
    const scope = [
        'instagram_basic',
        'pages_show_list',
        'pages_read_engagement',
        'pages_manage_posts',
        'instagram_content_publish',
        'ads_management',
        'business_management'
    ].join(',');

    const loginUrl = `https://www.facebook.com/v23.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${empresaCNPJ}`;

    const handleLogin = () => {
    window.location.href = loginUrl;
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
                        <p id="LGI"><a onClick={handleLogin}><FaFacebookSquare /></a></p>
                        <br/>
                        
                    </form>
                    <p className="alerta_login"></p>
                </div>
            </section>
        </>
    );
}
