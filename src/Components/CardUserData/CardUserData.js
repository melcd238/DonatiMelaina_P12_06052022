import React from "react"

//logos
import Calorie from '../../Assets/calories-icon.svg';
import Protein from '../../Assets/protein-icon.svg';
import Glucid from '../../Assets/carbs-icon.svg';
import Lipid from '../../Assets/fat-icon.svg';

const CardUserData = ({keyData})=>{

   
    
    return(
        <>
           <div className="card">
               <div className="cardImg">
                   <img src={Calorie} alt="logo calories"/>
               </div>
               <div className="cardText">
                   <p className="unit">{keyData?.calorieCount}Kcal</p>
                   <p className="nutri">Calories</p>
               </div>
          </div>

           <div className="card">
             <div className="cardImg">
                   <img src={Protein} alt="logo calories"/>
               </div>
               <div className="cardText">
                   <p className="unit">{keyData?.proteinCount}g</p>
                   <p className="nutri">Protéines</p>
               </div>
           </div>

           <div className="card">
             <div className="cardImg">
                   <img src={Glucid} alt="logo calories"/>
               </div>
               <div className="cardText">
                   <p className="unit">{keyData?.carbohydrateCount}g</p>
                   <p className="nutri">Glucides</p>
               </div>
           </div>

           <div className="card">
              <div className="cardImg">
                   <img src={Lipid} alt="logo calories"/>
               </div>
               <div className="cardText">
                   <p className="unit">{keyData?.lipidCount}g</p>
                   <p className="nutri">Lipides</p>
               </div>
           </div> 
        
        
        </>



    )
}

export default CardUserData;