import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance  } from "../../Services/CallAPI";
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
   const [performance, setPerformance] = useState({})
   const { id } = useParams()
   
  
   



   useEffect(()=>{
      
    const getUserData = async ()=>{
        let response = await getUserMainData(id);
         if(!ErrorEvent){
            setUserData(response.data)
         } else{
             response = await getUserMainDataMocked(id);
             setUserData(response.data)
         }
    }
        
    const getUserSession = async ()=>{
        let response = await getUserAverageSessions(id)
        if(!ErrorEvent){
            setSessions(response.data.sessions)
        } else {
            response = await getUserAverageSessionsMocked(id)
            setSessions(response.data.sessions)
        }
    }

    const getUserActivitys = async ()=>{
         let response = await getUserActivity(id)
         if(!ErrorEvent){
            setActivity(response.data.sessions) 
         } else{
             response = await getUserActivityMocked(id)
             setActivity(response.data.sessions)
         }
    }
    const getUserPerformances = async ()=>{
        let response = await getUserPerformance(id)
        if(!ErrorEvent){
            setPerformance(response.data) 
        } else{
            response = await getUserPerformanceMocked(id)
            setPerformance(response.data)
        }
        
    } 
        getUserData()
        getUserSession()
        getUserActivitys()
       getUserPerformances()
    
   },[id])

 
return(
        
    <main>
    <Title firstName = {userData.userInfos?.firstName}/>
    <section className="chartsContainer">
        <div className="charts">
              <BarChart activity={activity}/>
            <div className="threeChartsContainer">
              <LineChart sessions={sessions}/> 
              <RadarChart performance={performance}/>
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