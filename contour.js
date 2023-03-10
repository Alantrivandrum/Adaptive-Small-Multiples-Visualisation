  // Set up the data
  d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds500.csv").then((data) => {
      
      makeContourPlot(data);
});

function makeContourPlot(data){
  
  // Set up the scales
  const xScale = d3.scaleLinear().domain([0,10 /*d3.max(data, (d) => d.x)*/]).range([50, 550]);
  const yScale = d3.scaleLinear().domain([0,10 /*d3.max(data, (d) => d.y)]*/]).range([350, 50]);
  const zScale = d3.scaleLinear().domain([0, 100]).range([0, 255]);

  // Set up the color scale
  const colorScale = d3.scaleSequential(zScale).interpolator(d3.interpolateViridis);

  // Set up the contour generator
  const contourGenerator = d3
    .contourDensity()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
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
    .attr("class", "axis")
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
    .attr("class", "axis")
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("y");
}