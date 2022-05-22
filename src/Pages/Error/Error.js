import React from "react";
import  { Link } from 'react-router-dom'


const Error = ()=>{
    return(
        <>
        <div style={{margin:"auto"}}>
        <h1>Cette page n'existe pas <br/> <Link to="/">Retour à la page d'Accueil</Link> </h1>
        </div>
        </>
    )
}

export default Error