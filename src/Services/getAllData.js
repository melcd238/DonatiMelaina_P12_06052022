
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance  } from "./CallAPI"
import { getUserMainDataMocked, getUserActivityMocked, getUserAverageSessionsMocked, getUserPerformanceMocked } from './CallMockedData';

// To use Mocked Data, switch the import from CallMockedData and To use extern API switch the import from CallAPI

export const getAllData = async (id)=>{
   if(process.env.REACT_APP_DATA_SOURCE === "API"){
      const user =  await getUserMainData(id);
      const average = await getUserAverageSessions(id);
      const activity = await getUserActivity(id);
      const perform = await getUserPerformance(id);
     return Promise.all([user, average, activity,perform])
   }else if(process.env.REACT_APP_DATA_SOURCE === "MOCKED"){
      const user =  await getUserMainDataMocked(id);
      const average = await getUserAverageSessionsMocked(id);
      const activity = await getUserActivityMocked(id);
      const perform = await getUserPerformanceMocked(id);
     return Promise.all([user, average, activity,perform])  
   }

     
}



