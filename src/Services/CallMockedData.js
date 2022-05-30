
import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from '../Data/DataMocked'





export const getUserMainData= async (id) =>{
    try {
         // eslint-disable-next-line
        const response = USER_MAIN_DATA.find((elt)=> elt.id == id)
        return {data : response}
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserActivity = async(id)=>{


    try {
          // eslint-disable-next-line
        const response = USER_ACTIVITY.find((elt)=> elt.userId == id)
        return {data : response}
        
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserAverageSessions = async(id)=>{

    try {
         // eslint-disable-next-line
        const response = USER_AVERAGE_SESSIONS.find((elt)=> elt.userId == id)
        return {data : response}
        
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserPerformance= async(id)=>{

    try {
         // eslint-disable-next-line
        const response = USER_PERFORMANCE.find((elt)=> elt.userId == id)
        return {data : response}
        
    } catch (error) {
        console.log("error " + error)
    }
}

