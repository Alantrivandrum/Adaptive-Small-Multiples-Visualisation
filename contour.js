  // Set up the data
  d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds500.csv").then((data) => {
      
      makeContourPlot(data, "x", "y");
});

function makeContourPlot(data, data1, data2){
  
  let maxData1 = findMaxOfArray(data,data1);
  let maxData2 = findMaxOfArray(data,data2)
  // Set up the scales
  const xScale = d3.scaleLinear().domain([0,maxData1]).range([50, 550]);
  const yScale = d3.scaleLinear().domain([0,maxData2]).range([350, 50]);
  const zScale = d3.scaleLinear().domain([0, 100]).range([0, 255]);

  // Set up the color scale
  const colorScale = d3.scaleSequential(zScale).interpolator(d3.interpolateViridis);

  // Set up the contour generator
  const contourGenerator = d3
    .contourDensity()
    .x((d) => xScale(d[data1]))
    .y((d) => yScale(d[data2]))
    .size([500, 300])
    .bandwidth(25);

  // Generate the contours
  const contours = contourGenerator(data);

  // Add the contours to the chart
  const svg = d3.select("#my_dataviz").append("svg");
  svg.attr("width", "600")
  svg.attr("height", "400");
  
  svg
    .selectAll("path")
    .data(contours)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("fill", "none")
    .attr("stroke", "green");

  // Add x axis
  const xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, 350)")
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", 550)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("x");

  // Add y axis
  const yAxis = d3.axisLeft(yScale);
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("y");

  let zoom = d3.zoom()
  .scaleExtent([0.25, 10])
  .on('zoom', function(e){handleZoomContour(e,xScale,yScale,data1,data2,svg)});

    svg.call(zoom);
    
}


function findMaxOfArray(data, datapoint){
  var max = data[0][datapoint];
  for(var i=1; i<data.length; i++)
  {
   if(data[i][datapoint] > max){
      max = data[i][datapoint];
   } 
  }
  //console.log(max);
  return max;
}



function handleZoomContour(e, x, y, data1, data2, svg) {
  const newXScale = e.transform.rescaleX(x);
  const newYScale = e.transform.rescaleY(y);

  // Update the x and y scales based on the rescaled domain of the zoom event
  newXScale.domain(e.transform.rescaleX(x).domain());
  newYScale.domain(e.transform.rescaleY(y).domain());
 
  xAxis = svg.select("g.x-axis");
  yAxis = svg.select("g.y-axis");


  xAxis.call(d3.axisBottom(newXScale));
  yAxis.call(d3.axisLeft(newYScale));



}