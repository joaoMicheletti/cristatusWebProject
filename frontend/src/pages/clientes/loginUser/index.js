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
    const [aceitaPolitica, setAceitaPolitica] = useState(false);
    

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
    const state = '38860300835';
    const clientId = '3117860508390563';
    const redirectUri = 'https://www.acasaprime1.com.br/callback'; // configure no Facebook Dev ;// colocar dominio do ngrok antes dde mandar para analise 
    const scope = [
        'instagram_basic',
        'instagram_content_publish',
        'email',
        'public_profile',
    ].join(',');

    const loginUrl = `https://www.facebook.com/v23.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;

    const handleLogin = () => {
        console.log(aceitaPolitica)
        if(aceitaPolitica === true){
            window.location.href = loginUrl;
        } else {
            alert('confira nossas politicas de privacidade.')
            return
        }
    //
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
                        <p id="LGI"><FaFacebookSquare color="blue" /><a onClick={handleLogin}>Logar com Facebook </a></p>
                        <p id="Politica"> <a href="https://acasaprime1.com.br/politica-de-privacidade" target="_blank">Política de Privacidade</a></p>
                        <br/>
                        <div id="Dcheck">
                            <label id="check">
                            Concordar_   
                            <input
                            type="checkbox"
                            checked={aceitaPolitica}
                            onChange={(e) => setAceitaPolitica(e.target.checked)}
                            
                        />
                        </label>
                        </div>
                        
                        <br/>
                        <br/>
                        
                    </form>
                    <p className="alerta_login"></p>
                </div>
            </section>
        </>
    );
}
