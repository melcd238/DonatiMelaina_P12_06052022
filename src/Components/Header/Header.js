import React from "react";
import logo from '../../Assets/logo.svg'
import { Link } from 'react-router-dom';


const Header = () =>{


    return(
         <header>
              <div className="logo">
                <img src={logo} alt="logo de sportsee"/>
             </div>
            <nav className="navBar">
            
                <ul className="navList">
                    <li><Link className="linkNav" to="/">Accueil</Link></li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
         </header>
    )
}

export default Header;