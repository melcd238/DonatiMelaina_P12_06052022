import React  from 'react';
import PropTypes from "prop-types";;
/**
 * React Comoponent displaying the firstName in the title
 * @param {firstName: string} 
 * @returns {JSX}
 */


const Title = ({firstName})=>{
    
    return(
        <section className='titleContainer'>
          <h1>Bonjour <span className='nameTitle'> {firstName}  </span> </h1>
          <p className='felicitation'>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
        </section>
    )
}
Title.prototype ={
  firstName : PropTypes.string
}

export default React.memo(Title);