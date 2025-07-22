import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LoginUser from './pages/clientes/loginUser/index.js';
import Dashboard from './pages/clientes/dashboard';
import AnaliseCliente from './pages/clientes/analise/index.js';
import Manual from './pages/clientes/manual/index.js';
import Administrativo from './pages/clientes/adm/index.js'
import AjustesCliente from  './pages/clientes/ajustes/index.js';

//paginas crister time interno:
import LoginCrister from './pages/cristers/loginCrister/index.js';
import DashboarCrister from './pages/cristers/dashboard/index.js';
import DashboarColab from './pages/cristers/dashboardColab/index.js';
import CreateContent from './pages/cristers/createContent/index.js';
import Calendario from './pages/cristers/calendario/index.js';
import Aprovacao from './pages/cristers/aprovacao/index.js';
import UpdateMaterial from './pages/cristers/updateMaterial/index.js';
import UpdateMedias from './pages/cristers/updatemedias/index.js';
import Solicitacoes from './pages/cristers/solicitacoes/index.js';
import ChaveAcesso from './pages/cristers/cheve de acesso/index.js';
import RegisterCliente from './pages/cristers/cadastroCliente/index.js';
import RegisterColaborador from './pages/cristers/cadastroColaborador/index.js';
import BuscarCliente from './pages/cristers/infoCliente/index.js';
import ArquivoMorto from './pages/clientes/arquivoMorto/index.js';
import PoliticaDePrivacidade from './pages/politica/index.js';
import Termos from './pages/termos/index.js';
import Delete from './pages/delete/index.js';
// <Route path='*' element={<NotFound/>}/>
export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />               
                <Route path='loginUser' element={<LoginUser/>}/>
                <Route path='dashboardCliente' element={<Dashboard/>}/>
                <Route path='analiseCliente' element={<AnaliseCliente/>}/>
                <Route path='manualAplication' element={<Manual/>}/>
                <Route path='administrativo' element={<Administrativo/>} />
                <Route path='arquivoMorto' element={<ArquivoMorto/>}/>
                <Route path='ajustesCliente' element={<AjustesCliente/>}/>

                <Route path='politica-de-privacidade' element={<PoliticaDePrivacidade/>}/>
                <Route path='termos' element={<Termos/>}/>
                <Route path='delete' element={<Delete/>}/>

                <Route path='loginCrister' element={<LoginCrister/>}/>
                <Route path='dashboardCrister' element={<DashboarCrister/>}/>
                <Route path='createContent' element={<CreateContent/>}/>
                <Route path='calendario' element={<Calendario/>}/>
                <Route path='updateMaterial' element={<UpdateMaterial/>}/>
                <Route path='updateMedias' element={<UpdateMedias/>} />
                <Route path='aprovacao' element={<Aprovacao/>} />
                <Route path='solicitacoes' element={<Solicitacoes/>} />
                <Route path='chave' element={<ChaveAcesso/>}/>
                <Route path='cadUSer' element={<RegisterCliente/>}/>
                <Route path='cadColab' element={<RegisterColaborador/>}/>
                <Route path='buscarCliente' element={<BuscarCliente/>} />
                <Route path='dashboardColab' element={<DashboarColab/>}/>
            </Routes>
        </Router>
    )
};