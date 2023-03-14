const margin = { top: 10, right: 30, bottom: 30, left: 60 }
let width = 600;
let height = 400;
  // Set up the data
  d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds500.csv").then((data) => {
      
      makeContourPlot(data, "x", "y",width, height, margin, "#my_dataviz");
});


function makeContourPlot(data, data1, data2, width, height, margin, id) {
  const maxData1 = findMaxOfArray(data, data1);
  const maxData2 = findMaxOfArray(data, data2);

  // Set up the scales
  const xScale = d3.scaleLinear().domain([0, maxData1]).range([margin.left, width - margin.right]);
  const yScale = d3.scaleLinear().domain([0, maxData2]).range([height - margin.bottom, margin.top]);
  const zScale = d3.scaleLinear().domain([0, 100]).range([0, 255]);

  // Set up the color scale
  const colorScale = d3.scaleSequential(zScale).interpolator(d3.interpolateViridis);

  // Set up the contour generator
  const contourGenerator = d3
    .contourDensity()
    .x((d) => xScale(d[data1]))
    .y((d) => yScale(d[data2]))
    .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
    .bandwidth(25);

  // Generate the contours
  const contours = contourGenerator(data);

  // Add the contours to the chart
  const svg = d3.select(id).append("svg");
  svg.attr("width", width).attr("height", height);

  svg
    .selectAll("path")
    .data(contours)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("pointer-events", "none");

  // Add x axis
  const xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width - margin.right)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("x");

  // Add y axis
  const yAxis = d3.axisLeft(yScale);
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left}, 0)`)
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
    .on("zoom", function (e) {
      handleZoomContour(e, xScale, yScale, data, data1, data2, svg, contourGenerator);
    });

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



function handleZoomContour(e, x, y, data, data1, data2, svg, contourGenerator) {
  const newXScale = e.transform.rescaleX(x);
  const newYScale = e.transform.rescaleY(y);
  

  // Update the x and y scales based on the rescaled domain of the zoom event
  newXScale.domain(e.transform.rescaleX(x).domain());
  newYScale.domain(e.transform.rescaleY(y).domain());
 
  xAxis = svg.select("g.x-axis");
  yAxis = svg.select("g.y-axis");

  // Update the x and y scales of the contour generator
  contourGenerator.x((d) => newXScale(d[data1]));
  contourGenerator.y((d) => newYScale(d[data2]));

  // Generate the updated contours
  const updatedContours = contourGenerator(data);

  // Select all existing contour paths and bind the updated contours data
  const contourPaths = svg.selectAll("path").data(updatedContours);

  // Update existing paths with new data and scales
  contourPaths
    .attr("d", d3.geoPath())
    .attr("fill", "none")
    .attr("stroke", "green");

  // Add new paths for any new data points that appear after zooming
  contourPaths.enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("fill", "none")
    .attr("stroke", "green");

  // Remove any paths that are no longer needed after zooming
  contourPaths.exit().remove();

  // Update the x and y axes with the new scales
  xAxis.call(d3.axisBottom(newXScale));
  yAxis.call(d3.axisLeft(newYScale));

 //filterContours(550)
}

function filterContours(height) {

  d3.selectAll("path")
    .each(function() {
      // get the bounding box of the current contour path
      const bbox = this.getBBox();
      // check if the path is outside of the visible area
      if(bbox.x+bbox.width < 0 || bbox.y + bbox.height > height){
          d3.select(this).attr("class", "invisible");
      }
      else{
          d3.select(this).attr("class", "visible");
      }
    });

}



function updateBandwidth(scale) {
  const baseBandwidth = 25;
  const minScale = 0.25;
  const maxScale = 10;
  const minBandwidth = baseBandwidth / 4;
  const maxBandwidth = baseBandwidth * 4;
  const bandwidth = d3.interpolate(minBandwidth, maxBandwidth)(scale);
  return Math.max(bandwidth, minBandwidth);
}