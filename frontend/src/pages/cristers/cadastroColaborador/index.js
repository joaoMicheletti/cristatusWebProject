import React, { use, useState } from "react";
import Api from '../../../services/api';
import './styles.css';
import { useNavigate } from "react-router-dom";
import logoLogin from '../../../assets/image/logoLogin.webp'

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
            //let data = new Date()
            const Data = {
            user,
            pass,
            funcao: idPerfil,
            empresa: sessionStorage.getItem('tokenCrister')
            };
            console.log(Data)
            //enviar para a api e autenticar usuario
            await Api.post('/registerColab', Data).then((response) => {
                var Response = response.data;
                console.log(Response);
                if(Response.res === 'Registrado com sucesso!'){
                    alert(response.data.res)
                    Hystory('/dashboardCrister')
                } else if(response.data.res ="Colaborador já cadasstrado!"){
                    console.log(response)
                    alert(response.data.res);
                } else {
                    alert(response.data.res)
                }
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
                        <select id="SelectColab" value={idPerfil} onChange={(e) => setIdPerfil(e.target.value)}>
                            
                            <option value='selecione'>Selecione a função</option>
                            <option value='editor'>Editor</option>
                            <option value='socialmedia'>Social media</option>
                            <option value='gestor'>Gestor de Progetos</option>
                        </select>
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
                        <input onClick={Login} id="BtnLoginUser" type="button" value="Register"/>
                    </form>
                    <p className="alerta_login"></p>
                </div>
            </section>
        </>
    );
}
