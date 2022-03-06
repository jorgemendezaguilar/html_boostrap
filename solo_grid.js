function lineas_ref_x(){ 
    return d3.axisBottom(x)   
       .ticks(5)
   }

function lineas_ref_y(){ 
   return d3.axisLeft(y)  
       .ticks(5)
   }



// add grid
    
svg.append("g")
.attr("class","grid")
.attr("transform","translate(0," + height + ")") 
.call(lineas_ref_x().tickSize(-height).tickFormat(""))
.attr("stroke", "#00B0F0")
.attr("stroke-width", 1);

svg.append("g")
.attr("class","grid")
.call(lineas_ref_y().tickSize(-currentWidth).tickFormat(""));