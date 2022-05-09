import React from "react";
import logo from '../../Assets/logo.svg'
import { Link } from 'react-router-dom';


const Header = () =>{


    return(
         <header>
            <div className="logo"> 
                 <img src={logo} alt="logo de sportsee"/>
            </div>
            <nav>
                <ul className="navList">
                    <li>Accueil</li>
                    <li><Link className="linkNav" to="profil/:id"> Profil</Link></li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
         </header>
    )
}

export default Header;