import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LoginUser from './pages/loginUser';
import Dashboard from './pages/dashboard';
// <Route path='*' element={<NotFound/>}/>
export default function Rotas(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />               
                <Route path='loginUser' element={<LoginUser/>}/>
                <Route path='dashboardCliente' element={<Dashboard/>}/>
            </Routes>
        </Router>
    )

};