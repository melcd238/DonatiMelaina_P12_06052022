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
              const margin = {top:20,right:0,bottom:20, left:0}
              const width = 258 
              const height = 253
              const buffer = 35
              const radius = width /2 - buffer
              const maxValue = d3.max(data, function(d){return d.value})
             
    
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
           .attr('transform', `translate(${width / 2}, ${width / 2})`)
           
           
          const radialScale = d3.scaleLinear()
                               .domain([0 ,maxValue +10])
                               .range([0 , radius])
           const radialLine = d3.lineRadial()
                              .angle(d => d[0] * (Math.PI / 180))
                              .radius(d => radialScale(d[1])) 
                              
           const Angle = 360 / data.length; 

             
          
           // Add Axis from center 
           data.forEach((spend, index)=>{
             svg.select('#radialChart')
                 .append('path')
                 .attr('id', `axisPerform${index}`)
                 .attr('d', radialLine([
                   [index * Angle, 0], [index * Angle,maxValue ]
                 ]))
                 .style('fill', "none")
                 .style("stroke-width", '0,5')
                 .style("stroke", 'hsla(203, 9%, 17%, 1)')
                
  
                    // Add Text from axis 
           const Path = radialLine([
            [index * Angle, 0], [index * Angle,maxValue ]
          ])
            const selectIndex = Path.indexOf('L')
            const selectPosition = Path.slice(selectIndex + 1)
            let [X,Y] = [...selectPosition.split(',')]
            svg.select('#radialChart')
               .append('text')
               .attr('class','axisPerformtext')
               .text(()=>spend.kind)
               .attr('x', X)
               .attr('y', Y)
               .style('text-anchor','middle')
               .style('fill','black')
               .style('font-size', '8px')
               .transition()
               .duration(2000)
               .style('fill', 'white')

           }) 

           // create Polygone
           function createPolygon(rad){
            svg.select('#radialChart')
            .append('g')
            .attr('class','poly')
            .selectAll('path')
            .data([data])
            .join('path')
            .attr('d', d3.lineRadial()
             .angle((d,i)=>(i* Angle) * (Math.PI / 180))
             .radius(()=>radialScale(maxValue/rad)).curve(d3.curveLinearClosed))
            .style('fill','none')
            .style('stroke', "white")
            .attr('stroke-width', 1)
            }
            createPolygon(1.2)
            createPolygon(1.6)
            createPolygon(2)
            createPolygon(3)
            createPolygon(5.5)

            // ADD RadialLine of values. 
       
     

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