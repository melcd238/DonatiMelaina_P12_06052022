import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";


const BarChart = ({activity})=>{
   const data = activity;
   console.log(data)

    const ref = useRef(null)

    const DrawBarChart = (elt,data)=>{

    }

    useEffect(()=>{
        if(ref.current){
            DrawBarChart(ref.current, data)
        }
    }, [data])


    


    return(
        <div className="BarChartContainer" ref={ref}>
        </div>
    )
}

export default BarChart;