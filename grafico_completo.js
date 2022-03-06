 // set the dimensions and margins of the graph
 var margin = {top: 100, right: 550, bottom: 130, left: 200},
 width = 960 - margin.left - margin.right,
 height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#grafico")
.append("svg")
 .attr("width", width + margin.left + margin.right +200)
 .attr("height", height + margin.top + margin.bottom + 200)
.append("g")
 .attr("transform",
       "translate(" + margin.left + "," + margin.top + ")");

//Read the data
function dibujar(){

svg.selectAll('*').remove();

    d3.csv("",

    // When reading the csv, I must format variables:
      function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.Date), value : d.sold, value2 : d.open }
      },



    // Now I can use this dataset:
      function(data) {

      data.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
      });

    //GRID
      function lineas_ref_x(){ 
         return d3.axisBottom(x)   
            .ticks(5)
        }

    function lineas_ref_y(){ 
        return d3.axisLeft(y)  
            .ticks(5)
        }


        currentWidth = parseInt(d3.select('#grafico').style('width'), 10) - margin.left - margin.right


    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, currentWidth ]);

    var XAaxis = svg.append("g").attr("class","eje")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)).selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-.9em")
        .attr("dy",".13em")
        .attr("transform","rotate(-45)");
    
    //TITULO//
    svg.append("text")
        .attr("class","subtit")
        .attr("x",currentWidth/2)
        .attr("y",height+margin.top-40)
        .style("text-anchor","middle")
        .text("eje x")
        .style("fill", "black")
        .attr('font-weight', 'bold') //negrita
        .attr("font-size",10) 


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
    
    svg.append("g").attr("class","eje")
        .call(d3.axisLeft(y));

    //TITULO//
    svg.append("text")
        .attr("class","subtit")
        .attr("transform","rotate(-90)")
        .attr("y",-4-margin.left/2)
        .attr("x",0 - (height / 2))
        .style("text-anchor","middle")
        .attr("dy", "1em")
        .text("eje y")
        .style("fill", "black")
        .attr('font-weight', 'bold') //negrita
        .attr("font-size",10) //tamaño nombre

    // Add Y2 axis
    var y2 = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.value2; })])
    .range([ height, 0 ]);

    svg.append("g").attr("class","eje")
        .attr("transform", "translate(" + currentWidth + ", 0)")
        .call(d3.axisRight(y2))
        .selectAll("text")
        .attr("text-anchor", "start")                           
        .attr('font-size', 10)

    //TITULO//
    svg.append("text")
        .attr("class","subtit")
        .attr("transform","rotate(-90)")
        .attr("y",currentWidth + 65)
        .attr("x", 20 - (height / 2))
        .style("text-anchor","middle")
        .attr("dy", "1em")
        .text("Euros")
        .style("fill", "#2E74B5")
        .attr('font-weight', 'bold') //negrita
        .attr("font-size",20) //tamaño nombre


    // Add the line
    var grafico = svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#00B0F0")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

    // Add the line of circles
    svg.append('g')
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.date);})
            .attr("cy", function (d) { return y2(d.value2);})
            .attr("r", 1.5)
            .style("fill", "#7030A0")

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
 
    //TITULO GRÁFICO//
    svg.append('text')
        .attr("x", currentWidth / 2 )
        .attr("y", - 25)
        .style("text-anchor", "middle")
        .style("fill", "#1F4E79")
        .attr("font-weight", 700)
        .attr("font-size", 34)
        .text("Grafico2")
        .attr("text-decoration", "underline")
        
 

})}


window.onload = dibujar();

window.addEventListener('resize', dibujar );