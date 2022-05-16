import React, {useRef, useEffect}  from "react"
import * as d3 from "d3";





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
           .attr("preserveAspectRatio", "xMidYMid meet")
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
           let tooltips = svg.append("g")
                        .attr("class", "focus")
                        .style("display", "none")
               tooltips.append("circle")
                        .attr("r", 3)
                        .attr("fill", "white") 
               tooltips.append("rect")
                        .attr("class", "tooltip")
                        .attr("width", 60)
                        .attr("height", 50)
                        .attr("x", 10)
                        .attr("y", -22)
                        .attr("rx", 4)
                        .attr("ry", 4)
                        .attr("fill", "white")
                        .attr("stroke", "white")
                tooltips.append("text")
                        .attr("x", 18)
                        .attr("y", 8)
                        .text("Durée:")
                        .style("font-size", "8px");
                tooltips.append("text")
                         .attr("class", "tooltips-time")
                         .attr("x", 22)
                         .attr("y", 8)         
                        
               svg.append("rect")
                        .attr("class", "overlay")
                        .style("fill", "none")
                        .style("pointer-events", "all")
                        .attr("width", width)
                        .attr("height", height)
                        .on("mouseover", function() { tooltips.style("display", null); })
                        .on("mouseout", function() { tooltips.style("display", "none"); })
                      //  .on("mousemove", mousemove);
              /*   let bisecDate = d3.bisector(d => d.day).right;   
                        function mousemove() {
                            let x0 = x.invert(d3.pointer(this)[0]),
                                i = bisecDate(data, x0),
                                d = data[i]
                                console.log(i , d)
                           tooltips.attr("tranform", "translate(" + x(d.day) + "," + y(d.sessionLength) + ")")
                           d3.select(".tooltips-time").text(d.sessionLength + "min")    
                        }  */      
          

             
            

  


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