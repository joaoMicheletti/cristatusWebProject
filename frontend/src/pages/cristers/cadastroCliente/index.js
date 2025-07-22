import React, { use, useState } from "react";
import Api from '../../../services/api';
//import './styles.css';
import { useNavigate } from "react-router-dom";
import logoLogin from '../../../assets/image/logoLogin.webp'
import { FaFacebookSquare } from "react-icons/fa";

export default function RegisterCliente() {
    const Hystory = useNavigate();
    // Coloque os hooks useState fora da função Login
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [cPass, setCPass] = useState('');
    const [ idPerfil, setIdPerfil] = useState('');

    // Função de login
    async function Login(e) {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        // Aqui você pode adicionar lógica para autenticação real
        if(use === "" || pass === "" || cPass === "" || idPerfil === "" ){
            document.querySelector('.alerta_login').innerHTML ='* Preencha todos os campos.'

        } else if(cPass != pass){
            document.querySelector('.alerta_login').innerHTML ='As senhas presisam ser iguais '
        } else {
            let data = new Date()
            const Data = {
                user,
                pass, 
                idPerfil: idPerfil,
                initPlano: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
                empresa: sessionStorage.getItem('tokenCrister')
            };
            console.log(Data)
            //enviar para a api e autenticar usuario
            await Api.post('/registerUser', Data).then((response) => {
                var Response = response.data;
                console.log(Response);
                if(Response.res === 'Registrado com sucesso!'){
                    alert(response.data.res)
                    Hystory('/dashboardCliente')
                } else {
                    console.log(response.data.res)
                    alert(response.data.res);
                }
                console.log(Response.res )
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
                            
                            onChange={(e) => setIdPerfil(e.target.value)}
                            className="inputLoginCrister"
                            placeholder="  *ID do perfil Comercial "
                            type="text"
                            value={idPerfil}
                            required
                        />
                        <input 
                            
                            onChange={(e) => setPass(e.target.value)}
                            className="inputLoginCrister"
                            placeholder="  *Senha"
                            type="password"
                            value={pass}
                            required
                        />
                        <input 
                            
                            onChange={(e) => setCPass(e.target.value)}
                            className="inputLoginCrister"
                            placeholder="  *Confirmar Senha"
                            type="password"
                            value={cPass}
                            required
                        />
                        <br/>
                        <input onClick={Login} id="BtnLoginUser" type="button" value="Login"/>
                        <p id="LGI"><a onClick={handleLogin}><FaFacebookSquare /></a></p><br/>
                    </form>
                    <p className="alerta_login"></p>
                    
                </div>
            </section>
        </>
    );
}
