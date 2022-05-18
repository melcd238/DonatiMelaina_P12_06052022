import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";
import { select } from "d3";


const BarChart = ({activity})=>{
   const data = activity;
 

  

    const ref = useRef(null)

    const DrawBarChart = (elt,data)=>{
        const margin = {top:90,right:40,bottom:30, left:40}
        const width = 835 - margin.left - margin.right
        const height = 320 - margin.top - margin.bottom
        const minValue = d3.min(data, d=> d.kilogram) - 2
 
         d3.select(elt).select("svg").remove() // remove odl svg
 
            //new svg
          const svg = d3 
            .select(elt)
            .append("svg")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", height + margin.top + margin.bottom )
            .attr("width", width + margin.left + margin.right)
            .append("g")
            .attr('transform', 'translate(' + margin.left + "," + margin.top + ")");
 
            //Add X axis
            const x = d3.scaleBand()
                          .domain(data.map(d=> d.day))
                          .range([0, width])
                         
                          
             svg.append("g")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(x).ticks(7).tickSize(0,0))
               .attr("stroke-width", 0.2)
               .style("color", "#9B9EAC")
               .style("font-weight", "500") 
               .style("font-size","14px")
               
               
            //Add 2 Y axis
            const y0 = d3.scaleLinear()
                      .domain([0, d3.max(data, d => d.calories)])
                      .range([height , 0])
                      svg.append("g")
                      .attr("class", "y0 axis")
                      .call(d3.axisLeft(y0).ticks(0)).attr("stroke-width",0);

            const y1 = d3.scaleLinear()
                     .domain([minValue, d3.max(data, d=> d.kilogram)])
                     .range([height  , 0]) 
                     svg.append("g")
                     .attr("class", "y1 axis")
                    .attr('transform', 'translate(755,0)')
                    .call(d3.axisRight(y1).ticks(3)).attr("stroke-width", 0)
                    .style("color", "#9B9EAC")
                    .style("font-weight", "500") 
                    .style("font-size","14px");            
            
             // Add bar 
             svg.selectAll(".y0 axis")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("rx", 2)
                .attr("x", d=>x(d.day) + 60)
                .attr("width", x.bandwidth()/10)
                .attr("y", d=>y0(d.calories)) 
                .attr("height", d=> height - y0(d.calories))
                .attr("fill", "hsla(0, 100%, 45%, 1)")

                svg.selectAll(".y1 axis")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("rx", 2)
                .attr("x", d=>x(d.day) + 40)
                .attr("width", x.bandwidth()/10)
                .attr("y", d=>y1(d.kilogram) ) 
                .attr("height", d=> height - y1(d.kilogram))
                .attr("fill", "#282D30")
                    
             // Add Title
             const title = select("svg")
                   title.append('text')
                   .attr('text-anchor', 'middle')
                   .attr('x', 120)
                   .attr('y', 40)
                   .text(function(d){
                     return "Activité quotidienne"
                   })
                   .style('font-size', "15px")
                   .style('font-weight', '500') 
             // Add Legend
             const legend = select("svg")
                     legend.append("text") 
                     .attr('x',width-200)
                     .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .attr("fill",'#74798C')
                    .text(function(d){
                      return "Poids (kg)"
                    })
                    .style('font-size', "14px")
                    .style('font-weight', '500')
                    
                    legend.append("circle")
                    .attr("r","4px") 
                    .attr('cx',width-248)
                    .attr('cy', 35)
                    .attr("fill", "#282D30")
                    
             const legend1 = select("svg")
                    legend1.append("text") 
                    .attr('x',width - 20)
                    .attr('y', 40)
                   .attr('text-anchor', 'middle')
                   .attr("fill",'#74798C')
                   .text(function(d){
                     return "Calories brûlées (KCal)"
                   })
                   .style('font-size', "14px")
                   .style('font-weight', '500')
                   
                   legend1.append("circle")
                    .attr("r","4px") 
                    .attr('cx',width-108)
                    .attr('cy', 35)
                    .attr("fill", "hsla(0, 100%, 45%, 1)")        
                         
            
               
               
               
          
                      


    }

    useEffect(()=>{
        if(ref.current){
            DrawBarChart(ref.current, data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])


    


    return(
        <div className="BarChartContainer" ref={ref}>
        </div>
    )
}

export default React.memo(BarChart);