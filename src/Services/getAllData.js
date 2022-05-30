
//import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance  } from "./CallAPI"
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from './CallMockedData';

// To use Mocked Data, switch the import from CallMockedData and To use extern API switch the import from CallAPI

export const getAllData = async (id)=>{
   
       const user =  await getUserMainData(id);
       const average = await getUserAverageSessions(id);
       const activity = await getUserActivity(id);
       const perform = await getUserPerformance(id);
      return Promise.all([user, average, activity,perform])
    
}



