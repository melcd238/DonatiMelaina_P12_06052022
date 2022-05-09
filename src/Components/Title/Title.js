import React  from 'react';


const Title = ({userData})=>{
 
    return(
        <section className='titleContainer'>
          <h1>Bonjour <span className='nameTitle'> {userData.user?.userInfos.firstName} </span> </h1>
          <p className='felicitation'>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
        </section>
    )
}

export default Title;