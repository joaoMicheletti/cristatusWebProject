import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Home() {

    useEffect(() => {
        

        
    }, []);

    return (
        <>
            <h1>Cristatus</h1>
            <Link to='/loginUser'>Login cliente</Link>
            <br/>
            <Link to='/loginCrister'>Login Crister</Link>
        </>
    );
}
