import React from "react";
import alter from '../../Assets/alter.svg';
import meditation from '../../Assets/meditation.svg';
import nage from '../../Assets/nage.svg';
import velo from '../../Assets/velo.svg';


const Sidebar = () =>{


    return(
         <aside>
             <section className="logoSport">
                 <ul className="listLogoSport">
                     <li><img src={meditation} alt="meditation"/></li>
                     <li><img src={nage} alt="nage"/></li>
                     <li><img src={velo} alt="velo"/></li>
                     <li><img src={alter} alt="alter"/></li>
                 </ul>
               </section>
               <div>
                  <p className="copyRight">Copirygth, SportSee 2022</p>
               </div>
            
         </aside>
    )
}

export default Sidebar;