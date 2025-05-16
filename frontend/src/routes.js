import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LoginUser from './pages/loginUser';
import Dashboard from './pages/clientes/dashboard';
import AnaliseCliente from './pages/clientes/analise/index';

//paginas crister time interno:
import LoginCrister from './pages/cristers/loginCrister/index.js';
import DashboarCrister from './pages/cristers/dashboard/index.js'
// <Route path='*' element={<NotFound/>}/>
export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />               
                <Route path='loginUser' element={<LoginUser/>}/>
                <Route path='dashboardCliente' element={<Dashboard/>}/>
                <Route path='analiseCliente' element={<AnaliseCliente/>}/>

                <Route path='loginCrster' element={<LoginCrister/>}/>
                <Route path='dashboardCrister' element={<DashboarCrister/>}/>
            </Routes>
        </Router>
    )
};