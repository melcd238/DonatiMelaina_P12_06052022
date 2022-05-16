import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";


const BarChart = ({activity})=>{
   const data = activity;
   console.log(data)

    const ref = useRef(null)

    const DrawBarChart = (elt,data)=>{
        const margin = {top:40,right:40,bottom:30, left:40}
        const width = 835 - margin.left - margin.right
        const height = 320 - margin.top - margin.bottom
 
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
            const xScale = d3.scaleBand()
                          .domain(data.map(d=> d.day))
                          .range([0, width])
                         
                          
             svg.append("g")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(xScale))
               .attr("stroke-width", 1.5)
               .style("color", "black")
               .style("font-weight", "500") 
               .style("font-size","12px")
               
             // Add Y1 axis  
            const y1Scale = d3.scaleLinear()
                            .domain([0, d3.max(data, d=> d.calories)])
                            .range([height, 0]) 
             svg.append("g")
                .call(d3.axisLeft(y1Scale).ticks(7)).attr("stroke-width",1.5);

            const y2Scale = d3.scaleLinear()
                            .domain(d3.extent(data, function(d){return d.kilogram}))
                            .range([height, 0]) 
            svg.append("g")
            .attr('transform', 'translate(755,0)')
            .call(d3.axisRight(y2Scale).ticks(3)).attr("stroke-width",1.5);                     
                
            // Add bar 
            svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d=>xScale(d.day))
                .attr("width", xScale.bandwidth()/8)
                .attr("y", d=>y1Scale(d.calories)) 
                .attr("height", d=> height - y1Scale(d.calories))
                .attr("fill", "hsla(0, 100%, 45%, 1)")
                

            // Add HorizontalGrid 
           
            
          
                      


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

export default React.memo(BarChart);