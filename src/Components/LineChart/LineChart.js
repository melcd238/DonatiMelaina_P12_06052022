import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";


const LineChart = ({userData})=>{
    const data = userData.session?.sessions
    console.log(data)
    const ref = useRef(null)
    

    const DrawLineChart =(elt,data)=>{
       // const boxSize = 900;
       const margin = {top:29,right: 10,bottom:20, left:20}
       const width = 258 - margin.left - margin.right
       const height = 253 - margin.top - margin.bottom

        d3.select(elt).select("svg").remove() // remove odl svg

           //new svg
           const svg = d3 
           .select(elt)
           .append("svg")
           .attr("preserveAspectRatio", "xMidYMid meet")
           .attr("height", height + margin.top + margin.bottom )
           .attr("width", width + margin.left + margin.right)
          // .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
           .append("g")
          // .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);
           .attr('transform', 'translate(' + margin.left + "," + margin.top + ")");

           //Add X axis 

         const x = d3.scaleLinear()
                 .domain(d3.extent(data, function(d){return d.day}))
                 .range([ 0, width])
              svg.append("g")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(x))    

           //Add Y Axis ( not visible)
           const y = d3.scaleLinear()
                .domain(d3.extent(data, function(d){return d.sessionLength}))
                .range([ height, 0 ]);
             svg.append("g")
                .call(d3.axisLeft(y));

           // Add the line

           svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
                   .x(function(d) { return x(d.day) })
                   .y(function(d) { return y(d.sessionLength) })
                 )
          

           // Add The points

           svg.append("g")
              .selectAll("dot")
              .data(data)
              .enter()
              .append("circle")
                 .attr("cx", function(d) { return x(d.day) })
                 .attr("cy", function(d) { return y(d.sessionLength)})
                 .attr("r", 5)
                 .attr("fill", "#ffffff")


           // Add the tooltips

    }


    useEffect(() => {
        if (ref.current) {
          DrawLineChart(ref.current, data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data]);
    
    return(
        <div className="LineChartContainer" ref={ref}>
        </div>
    )
}

export default React.memo(LineChart);