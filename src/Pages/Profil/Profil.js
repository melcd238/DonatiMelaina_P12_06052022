import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Title from '../../Components/Title/Title';
import CardUserData from "../../Components/CardUserData/CardUserData";
import BarChart from "../../Components/BarChart/BarChart";
import LineChart from "../../Components/LineChart/LineChart";
import RadarChart from "../../Components/RadarChart/RadarChart";
import PieChart from "../../Components/PieChart/PieChart";
import Error from "../Error/Error";
import { getAllData } from "../../Services/getAllData";

/**Render the Profil
 * @return {JSX}
 */


const Profil = ()=>{
    
   const [userData, setUserData] =useState()
   const [userScore, setUserScore] = useState() 
   const [keyData, setKeydata] = useState({})
   const [sessions, setSessions] = useState([])
   const [activity, setActivity] = useState([])
   const [performance, setPerformance] = useState([])
   const { id } = useParams()
   
   
  useEffect(()=>{
    getAllData(id)
      .then((values)=>{
            setKeydata(values[0].data.keyData)
            setUserData(values[0].data.userInfos.firstName)
            setUserScore(values[0].data.todayScore ||values[0].data.score)
            setActivity(values[2].data.sessions)
            setPerformance(values[3].data.data)
            setSessions(values[1].data.sessions)
      }).catch((error)=>{
        console.log(error)
    });  
  
   },[id])

    if(userData === undefined){
        return <Error/>
    }


    return(
        
        <main>
        <Title firstName = {userData}/>
        <section className="chartsContainer">
            <div className="charts">
                  <BarChart activity={activity}/>
                <div className="threeChartsContainer">
                  <LineChart sessions={sessions}/> 
                  <RadarChart datas={performance}/>
                  <PieChart score={userScore}/>
                 </div>
            </div>
            <div className="cardsContainer">
              <CardUserData keyData={keyData}/>
            </div>
    
        </section>
     </main>
    
    
       
    )  
}

   


export default Profil