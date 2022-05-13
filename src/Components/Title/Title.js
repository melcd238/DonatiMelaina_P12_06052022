import React  from 'react';


const Title = ({firstName})=>{
    
    return(
        <section className='titleContainer'>
          <h1>Bonjour <span className='nameTitle'> {firstName}  </span> </h1>
          <p className='felicitation'>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
        </section>
    )
}

export default Title;