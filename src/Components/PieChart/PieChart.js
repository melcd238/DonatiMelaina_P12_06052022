import React, {useRef, useEffect} from "react";
import * as d3 from "d3";



const PieChart = ({userData})=>{
   let scoreData = userData.user?.todayScore * 100;
   const data =[{value: scoreData},{value:100 - scoreData}]
   console.log(data)
   const ref = useRef(null);

    // With D3 : draw SVG
    const DrawPieChart = (elt, data) =>{
        console.log(data)
        const colors = ["#FF0000","#FBFBFB"];
        const boxSize = 500;

        d3.select(elt).select("svg").remove() // remove odl svg

        //new svg
        const svg = d3 
             .select(elt)
             .append("svg")
             .attr("preserveAspectRatio", "xMidYMid meet")
             .attr("height", "100%")
             .attr("width", "100%")
             .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
             .append("g")
             .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);
             svg
             .append("circle")
             .attr("cx", 0)
             .attr("cy", 0)
             .attr("r", 220) 
             .attr("stroke", "#ffffff")
             .attr("fill", "#ffffff")
             .transition()
             .duration(700)
             .attr("stroke-width", 8); 
    
        
        const arcGenerator = d3.arc().cornerRadius(18).innerRadius(220).outerRadius(250);

        const pieGenerator = d3.pie().value((d) => d.value);
           
        const arcs = svg.selectAll().data(pieGenerator(data)).enter();
             arcs
               .append("path")
               .attr("d", arcGenerator)  
               .style("fill", (d, i) => colors[i % data.length]);  
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
                .attr('x', 0)
                .attr('y', 0)
                .attr('text-anchor', 'middle')
                .text(function(d){
                  return scoreData + '%'
                })
                .style("fill","#282D30")
                .style('font-size', "60px")
                .style('font-weight', '700')          


    
    }


  useEffect(() => {
    if (ref.current) {
      DrawPieChart(ref.current, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
    return(
        <div className="PieChartContainer">
          <p>Score</p>
            <div className="graph" ref={ref}>
            </div> 
        </div>
    )
}

export default React.memo(PieChart);