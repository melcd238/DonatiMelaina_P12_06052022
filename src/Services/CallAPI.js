import axios from 'axios';

// faire un useFetch pour eviter de se répéter.


export const getUserMainData = async (id) =>{
    try {
       const response = await axios.get(`http://localhost:3000/user/${id}`)
       return response.data
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserActivity = async(id)=>{


    try {

        const response = await axios.get(`http://localhost:3000/user/${id}/activity`)
        return response.data
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserAverageSessions = async(id)=>{

    try {

        const response = await axios.get(`http://localhost:3000/user/${id}/average-sessions`)
        return response.data
        
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserPerformance= async(id)=>{

    try {

        const response =  await axios.get(`http://localhost:3000/user/${id}/performance`)
        return response.data
        
    } catch (error) {
        console.log("error " + error)
    }
}

