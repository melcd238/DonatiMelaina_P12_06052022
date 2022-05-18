import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";


const RadarChart = ({datas})=>{
  const ref = useRef(null)

  const data = datas.map((data)=>{
    switch (data.kind){
      case 1 :
        return {...data, kind: "Cardio"};
      case 2 :  
      return {...data, kind: "Energie"};
      case 3 :  
      return {...data, kind: "Endurance"};
      case 4 :  
      return {...data, kind: "Force"};
      case 5 :  
      return {...data, kind: "Vitesse"};
      case 6 :  
      return {...data, kind: "Intensité"};
      default :
      return {...data};
    }
})

   console.log(data)
   
 
 const DrawRadarChart = (elt , data)=>{
              //Variables usefull:
              const margin = {top:20,right:14,bottom:20, left:14}
              const width = 258 - margin.left - margin.right
              const height = 253 - margin.top - margin.bottom
              const buffer = 35
              const radius = width /2 - buffer
            
    
       d3.select(elt).select("svg").remove() // remove odl svg
       
           //new svg
           const svg = d3 
           .select(elt)
           .append("svg")
           .attr("preserveAspectRatio", "xMidYMid meet")
           .attr("height", height + margin.top + margin.bottom )
           .attr("width", width + margin.left + margin.right)
           svg.append("g")
           .attr('id','radialChart')
           .attr('transform', 'translate(' + margin.left + "," + margin.top + ")")
           //.attr('transform', `translate(${width / 2}, ${width / 2})`);
           
     /*      const radialScale = d3.scaleLinear()
                               .domain([0 ,d3.max(data, function(d){return d.value})])
                               .range([0 , radius])
           const radialLine = d3.lineRadial()
                              .angle(d => d[0] * (Math.PI / 180))
                              .radius(d => radialScale(d[1])) 
                              
           const Angle = 360 / data.length; 
           
           data.forEach((spend, index)=>{
             svg.select('#radialChart')
                 .append('path')
                 .attr('id', `axisPerform${index}`)
                 .attr('d', radialLine([
                   [index * Angle, 0], [index * Angle, d3.max(data, function(d){return d.value}) ]
                 ]))
                 .style('fill', "none")
                 .style("stroke-width", '0,5')
                 .style("stroke", 'white')
           }) */

    }

    useEffect(()=>{
        if (ref.current) {
            DrawRadarChart(ref.current,data );
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])


    return(
        <div className="RadarChartContainer" ref={ref}>
        </div>
    )
}

export default  React.memo(RadarChart); 