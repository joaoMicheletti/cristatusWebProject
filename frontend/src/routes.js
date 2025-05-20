import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LoginUser from './pages/clientes/loginUser/index.js';
import Dashboard from './pages/clientes/dashboard';
import AnaliseCliente from './pages/clientes/analise/index';

//paginas crister time interno:
import LoginCrister from './pages/cristers/loginCrister/index.js';
import DashboarCrister from './pages/cristers/dashboard/index.js';
import CreateContent from './pages/cristers/createContent/index.js';
import Calendario from './pages/cristers/calendario/index.js';
// <Route path='*' element={<NotFound/>}/>
export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />               
                <Route path='loginUser' element={<LoginUser/>}/>
                <Route path='dashboardCliente' element={<Dashboard/>}/>
                <Route path='analiseCliente' element={<AnaliseCliente/>}/>

                <Route path='loginCrister' element={<LoginCrister/>}/>
                <Route path='dashboardCrister' element={<DashboarCrister/>}/>
                <Route path='createContent' element={<CreateContent/>}/>
                <Route path='calendario' element={<Calendario/>}/>
            </Routes>
        </Router>
    )
};