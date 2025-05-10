import React from "react";
import {Link} from 'react-router-dom';
export default function Home(){
    return(
        <>
            <h1>Cristatus</h1>
            <Link to='loginUser'>Login</Link>
        </>
    );
};