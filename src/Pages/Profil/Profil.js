import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getUserMainDataMocked, getUserActivityMocked, getUserAverageSessionsMocked, getUserPerformanceMocked } from '../../Services/CallMockedData';

import Title from '../../Components/Title/Title';
import CardUserData from "../../Components/CardUserData/CardUserData";
import BarChart from "../../Components/BarChart/BarChart";
import LineChart from "../../Components/LineChart/LineChart";
import RadarChart from "../../Components/RadarChart/RadarChart";
import PieChart from "../../Components/PieChart/PieChart";




const Profil = ()=>{
   const [userData, setUserData] =useState([]) 
   const [sessions, setSessions] = useState([])
   const [activity, setActivity] = useState([])
   const { id } = useParams()
   
  
   



   useEffect(()=>{
       /* Faire un if si l'api ne fonctionne pas on set le userData avec les données mockées*/ 
    const getUserData = async ()=>{
        const response = await getUserMainDataMocked(id);
        setUserData(response.data)
    }
    const getUserSession = async ()=>{
        const response = await getUserAverageSessionsMocked(id)
        setSessions(response.data.sessions)
        
    }
    const getUserActivity = async ()=>{
        const response = await getUserActivityMocked(id)
        setActivity(response.data.sessions)
       
    }
        getUserData()
        getUserSession()
        getUserActivity()
    
   },[id])

 
return(
        
    <main>
    <Title firstName = {userData.userInfos?.firstName}/>
    <section className="chartsContainer">
        <div className="charts">
              <BarChart activity={activity}/>
            <div className="threeChartsContainer">
              <LineChart sessions={sessions}/> 
              <RadarChart/>
              <PieChart score={userData?.todayScore || userData?.score}/>
              
              
            </div>
        </div>
        <div className="cardsContainer">
          <CardUserData keyData={userData?.keyData}/>
        </div>

    </section>
 </main>


   
)  



}

   


export default Profil