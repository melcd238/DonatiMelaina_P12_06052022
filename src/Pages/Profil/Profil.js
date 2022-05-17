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
        const user = await getUserMainData(id);
         if(!ErrorEvent){
            setUserData(user.data)
         } else{
           const userMocked = await getUserMainDataMocked(id);
             setUserData(userMocked.data)
         }
    }
        
    const getUserSession = async ()=>{
        const average = await getUserAverageSessions(id)
        if(!ErrorEvent){
            setSessions(average.data.sessions)
        } else {
           const averageMocked = await getUserAverageSessionsMocked(id)
            setSessions(averageMocked.data.sessions)
        }
    }

    const getUserActivitys = async ()=>{
         const activity = await getUserActivity(id)
         if(!ErrorEvent){
            setActivity(activity.data.sessions) 
         } else{
            const activityMocked = await getUserActivityMocked(id)
             setActivity(activityMocked.data.sessions)
         }
    }
    const getUserPerformances = async ()=>{
        const perform = await getUserPerformance(id)
        if(!ErrorEvent){
            setPerformance(perform.data) 
        } else{
           const performMocked = await getUserPerformanceMocked(id)
            setPerformance(performMocked.data)
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