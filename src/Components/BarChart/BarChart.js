import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";
import { select } from "d3";
import PropTypes from "prop-types";

/**
 * React Comoponent displaying the Bar chart  of daily activity
 * @param {{ activity : array}} : array of object with data for the Bar chart 
 * @function DrawBarChart : Draw the svg Bar chart with D3.js
 * @returns {JSX}
 */

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
                          .domain(data.map(d=> d.day.substr(8,2)))
                          .range([0, width])
                         
                         
                          
             svg.append("g")
              .attr("class", "xAxis")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(x).ticks(7).tickPadding(12).tickSize(0))
               .attr("stroke-width", 0.8)
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
                    .call(d3.axisRight(y1).ticks(3).tickPadding(10).tickSize(-width))
                    .attr("stroke-width", 0.3)
                    .attr("stroke-dasharray", "4")
                    .style("color", "#9B9EAC")
                    .style("font-weight", "500") 
                    .style("font-size","14px");

              // Add rectangles appears on mouseover
                    
               let rectangle = svg.selectAll("rect").data(data);
               rectangle.enter().append("rect")
                                .attr("width",x.bandwidth())
                                .attr("height", height)
                                .attr("x",function(d,i){return i*108})
                                . attr("y", 0)
                                .style("opacity", 0)
                                .style("fill","rgba(196, 196, 196, 0.5)")
                                .style("pointer-events","all") 
                                .on("mouseover", function(event,d) {
                                    
                                  d3.select(this).transition().duration(200).style("opacity", .9)
                                  divTooltip.transition()
                                  .duration(200)
                                  .style("display", "block");
                                  divTooltip.html(d.kilogram  +  "kg" + " " + d.calories + "Kcal")
                                  .style("left",  (event.pageX - 10) + "px")
                                  .style("top", ( 400) + "px");
                      
                                  })
                                  .on("mouseout", function(d) {
                                    d3.select(this).transition()
                                      .duration(200)
                                      .style("opacity", 0);
                                      divTooltip.transition()
                                      .duration(200)
                                      .style("display", "none");  
                                    });


             // Add bar 
             svg.append("g")
                .selectAll(".y0 axis")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "barCal")
                .attr("rx", 2)
                .attr("x", d=>x(d.day.substr(8,2)) + 60)
                .attr("width", x.bandwidth()/10)
                .attr("y", d=>y0(d.calories)) 
                .attr("height", d=> height - y0(d.calories))
                .attr("fill", "hsla(0, 100%, 45%, 1)")
              
               

              svg.append("g")
                .selectAll(".y1 axis")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("rx", 2)
                .attr("x", d=>x(d.day.substr(8,2)) + 60)
                .attr("x", d=>x(d.day.substr(8,2)) + 40)
                .attr("width", x.bandwidth()/10)
                .attr("y", d=>y1(d.kilogram) ) 
                .attr("height", d=> height - y1(d.kilogram))
                .attr("fill", "#282D30")
    
            // Add Tooltip
               // Add Tooltip
          let divTooltip = d3.select(elt).append("div")
          .style("display","none")
          .style("text-align","center")
          .style("padding-top","8px")
          .style("position", "absolute")
          .style("width","39px")
          .style("height","63px")
          .style("font-size","7px")
          .style("color","white")
          .style("background","#E60000")
          .style("border","0px")
          .style("border-radius","5px")
          .style("pointer-events","none")       


                    
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
                    
          //TOOLTIPS
     
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

BarChart.prototype={
  activity : PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      kilogram: PropTypes.number,
      calories:PropTypes.number
    })
  )
}

export default React.memo(BarChart);