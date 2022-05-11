import React, { useEffect, useState } from "react";

import Title from '../../Components/Title/Title';
import CardUserData from "../../Components/CardUserData/CardUserData";
import BarChart from "../../Components/BarChart/BarChart";
import LineChart from "../../Components/LineChart/LineChart";
import RadarChart from "../../Components/RadarChart/RadarChart";
import PieChart from "../../Components/PieChart/PieChart";




import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from '../../Services/CallMock';


const Profil = ()=>{
    const [userData, setUserData] = useState({});
    const [keydata, setKeyData] = useState({})
   const [id, setId] = useState(12);
   const userMocked = {user : USER_MAIN_DATA, activity: USER_ACTIVITY, session:USER_AVERAGE_SESSIONS, performance:USER_PERFORMANCE};
   
  



   useEffect(()=>{
      // console.log(userMocked);
       setUserData({...userMocked});
       setKeyData({...userMocked.user.keyData})
  
   },[id])

    return(
        <main>
           <Title userData={userData}/>
           <section className="chartsContainer">
               <div className="charts">
                   <BarChart/>
                   <div className="threeChartsContainer">
                      <LineChart userData={userData}/>
                      <RadarChart userData={userData}/>
                      <PieChart userData={userData}/>
                   </div>
               </div>
               <div className="cardsContainer">
                 <CardUserData keydata={keydata}/>
               </div>

           </section>
        </main>
    )
}

export default Profil