import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";
import { curveNatural } from "d3";




const LineChart = ({sessions})=>{
   
   
    const data = sessions.map((data)=>{
      switch (data.day){
        case 1 :
          return {...data, days: "L"};
        case 2 :  
        return {...data, days: "M"};
        case 3 :  
        return {...data, days: "M"};
        case 4 :  
        return {...data, days: "J"};
        case 5 :  
        return {...data, days: "V"};
        case 6 :  
        return {...data, days: "S"};
        case 7 :  
        return {...data, days: "D"};
        default :
        return {...data};
      }

    })
    
    console.log(data)

  
    
    const ref = useRef(null)

    /* Reste : - rajouter les valeur days a la place de day
               -faire le toolTips au survol
               -arrondir la ligne */
    

   const DrawLineChart =(elt,data)=>{
       const margin = {top:34,right: 10,bottom:20, left:20}
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
           .append("g")
           .attr('transform', 'translate(' + margin.left + "," + margin.top + ")");

           //Add X axis 

       const x = d3.scaleLinear()
                 .domain([1 , data.length])
                 .range([ 0, width])
                 
              svg.append("g")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(x).ticks(7)).attr("stroke-width",0)   

           //Add Y Axis ( not visible)
          const y = d3.scaleLinear()
                .domain(d3.extent(data, function(d){return d.sessionLength}))
                .range([ height - 20, 40 ]);
             svg.append("g")
                .call(d3.axisLeft(y).ticks(0)).attr("stroke-width",0); 

           // Add the line

          svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 2)
              .attr("d", d3.line()
                   .curve(d3.curveNatural)
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
                 .attr("r", 1)
                 .attr("fill", "#ffffff") 

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