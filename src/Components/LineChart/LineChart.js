import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";
import PropTypes from "prop-types";


/**
 * React Comoponent displaying the Line chart  of session length
 * @param {{ sessions : array}} : array of object with data for the Line chart 
 * @function DrawLineChart : Draw the svg line chart with d3.js
 * @returns {JSX}
 */


const LineChart = ({sessions})=>{
    const data = sessions.map((data)=>{
      switch (data.day){
        case 1 :
          return {...data, day: "L"};
        case 2 :  
        return {...data, day: "M"};
        case 3 :  
        return {...data, day: "M "};
        case 4 :  
        return {...data, day: "J"};
        case 5 :  
        return {...data, day: "V"};
        case 6 :  
        return {...data, day: "S"};
        case 7 :  
        return {...data, day: "D"};
        default :
        return {...data};
      }

    })
    
    const ref = useRef(null)

   const DrawLineChart =(elt,data)=>{
       const margin = {top:34,right:14,bottom:20, left:14}
       const width = 258 - margin.left - margin.right
       const height = 253 - margin.top - margin.bottom

        d3.select(elt).select("svg").remove() // remove odl svg

           //new svg
         const svg = d3 
           .select(elt)
           .append("svg")
           //.attr("preserveAspectRatio", "xMidYMid meet")
           .attr("height", height + margin.top + margin.bottom )
           .attr("width", width + margin.left + margin.right)
           .append("g")
           .attr('transform', 'translate(' + margin.left + "," + margin.top + ")");

           //Add X axis 

       const x = d3.scaleBand()
                 .domain(data.map(d => d.day))
                 .range([ 0, width])
                 .paddingInner(1)
                 
              svg.append("g")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(x))
               .attr("stroke-width", 0)
               .style("color", "rgba(255, 255, 255, .6)")
               .style("font-weight", "500") 
               .style("font-size","12px")

           //Add Y Axis ( not visible)
          const y = d3.scaleLinear()
                .domain(d3.extent(data, function(d){return d.sessionLength}))
                .range([ height - 20, 60 ]);
             svg.append("g")
                .call(d3.axisLeft(y).ticks(0)).attr("stroke-width",0); 

           // Add the line

          svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 2)
              .attr("d", d3.line()
                   .curve(d3.curveCardinal)
                   .x(function(d) { return x(d.day) })
                   .y(function(d) { return y(d.sessionLength) })
                 ) 

           // Add The points

          svg.append("g")
              .selectAll("dot")
              .data(data)
              .enter()
              .append("circle")
                 .attr("class","tooltipBasic")
                 .attr("cx", function(d) { return x(d.day) })
                 .attr("cy", function(d) { return y(d.sessionLength)})
                 .attr("r", 6)
                 .attr("fill", "none")
                 .style("pointer-events","all")
                 .on("mouseover", function(event,d) {
                  d3.select(this).transition().duration(200).attr("fill","white")
                  divTooltip.transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("display", "block");
                  divTooltip.html( d.sessionLength +  " min")
                    .style("left", (event.pageX - 5) + "px")
                    .style("top", (event.pageY - 40) + "px");
                   backgroundDiv.transition().duration(200)
                   .style("top", (700) + "px")
                   .style("width",(event.pageX - 228) + "px")
                   .style("display", "block")
                   .style("opacity", .4);
                   d3.select(elt).transition().duration(200).style("background","#E60000")
                   
                  })
                .on("mouseout", function(d) {
                  d3.select(this).transition().duration(200).attr("fill","none")
                  divTooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                    backgroundDiv.transition().duration(200)
                    .style("display","none") 
                    d3.select(elt).transition().duration(200).style("background","#FF0000") 
                  });
           
           // Add Tooltip
          let divTooltip = d3.select(elt).append("div")
                       .style("opacty", 0)
                       .style("display","none")
                       .style("text-align","center")
                       .style("padding-top","8px")
                       .style("position", "absolute")
                       .style("width","39px")
                       .style("height","25px")
                       .style("font-size","8px")
                       .style("background","white")
                       .style("border","0px")
                       .style("border-radius","2px")
                       .style("pointer-events","none") 
                       .style("zindex","10")      
          // Add Div for background red
          let backgroundDiv = d3.select(elt).append("div")
                            .style('background',"#FF0000")
                            .style("height","262px")
                            .style("position", "absolute")
                            .style("pointer-events","none")
                            .style("display","none")
                            .style("border-top-left-radius", "5px")
                            .style("border-bottom-left-radius", "5px")  
                   
           // Add Legend
           const legend = svg
           .selectAll('.legend')
           .data(data)
           .enter()
           .append('g')
           .attr('class','legend')
           .attr('transform', function(d,i){
             return 'translate(' + 0 + ',' + 0 + ')';
           })
           legend 
              .append('text')
              .attr('x', 76)
              .attr('y', 10)
              .attr('text-anchor', 'middle')
              .text(function(d){
                return "Durée moyenne des"
              })
              .style("fill","rgba(255, 255, 255, .1)")
              .style('font-size', "14px")
              .style('font-weight', '500') 
            legend 
              .append('text')
              .attr('x', 40)
              .attr('y', 32)
              .attr('text-anchor', 'middle')
              .text(function(d){
                return 'session'
              })
              .style("fill","rgba(255, 255, 255, .1)")
              .style('font-size', "14px")
              .style('font-weight', '500')  

    }


    useEffect(() => {
        if (ref.current) {
          DrawLineChart(ref.current, data);
        }
      
      }, [data]);
    
    return(
        <div className="LineChartContainer" ref={ref}>
        </div>
    )
}

LineChart.prototype={
  sessions : PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number,
      sessionLength: PropTypes.number,
    })
  )
}

export default React.memo(LineChart);