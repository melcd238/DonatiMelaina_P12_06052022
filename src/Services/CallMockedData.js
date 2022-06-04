
import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from '../Data/DataMocked'

/**
 * functions that returns the  mocked data depending on the id
 * @function getUserMainDataMocked
 * @function getUserActivityMocked
 * @function getUserAverageSessionsMocked
 * @function getUserPerformanceMocked
 * @returns {data : response}
 */



export const getUserMainDataMocked= async (id) =>{
    try {
         // eslint-disable-next-line
        const response = USER_MAIN_DATA.find((elt)=> elt.id == id)
        return {data : response}
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserActivityMocked = async(id)=>{


    try {
          // eslint-disable-next-line
        const response = USER_ACTIVITY.find((elt)=> elt.userId == id)
        return {data : response}
        
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserAverageSessionsMocked = async(id)=>{

    try {
         // eslint-disable-next-line
        const response = USER_AVERAGE_SESSIONS.find((elt)=> elt.userId == id)
        return {data : response}
        
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserPerformanceMocked= async(id)=>{

    try {
         // eslint-disable-next-line
        const response = USER_PERFORMANCE.find((elt)=> elt.userId == id)
        return {data : response}
        
    } catch (error) {
        console.log("error " + error)
    }
}

