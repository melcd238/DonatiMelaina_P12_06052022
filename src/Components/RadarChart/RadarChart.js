import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";


const RadarChart = ({userData})=>{
    const data = userData?.performance
    console.log(data)
    const ref = useRef(null)

    const DrawRadarChart = (elt , data)=>{
              //Variables usefull:
       
    
       d3.select(elt).select("svg").remove() // remove odl svg

  

    }

    useEffect(()=>{
        if (ref.current) {
            DrawRadarChart(ref.current, data);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])


    return(
        <div className="RadarChartContainer" ref={ref}>
        </div>
    )
}

export default  React.memo(RadarChart); 