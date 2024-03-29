
var stopResizeVar = false;
var startTime =0;
var endTime = 0;
let scalesMap = {};
let dataTypeMap = {};
var color = d3.rgb(100, 150, 100);
var color2 = d3.rgb(100, 250, 100);
let chosenAttributes = ["x", "depth", "table", "y", "z", "carat"];

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 50, left: 60 };
//width = 350 - margin.left - margin.right,
//height = 300 - margin.top - margin.bottom;
let width = document.getElementById("main").offsetWidth / 4.5;
let height = document.getElementById("main").offsetHeight / 4.5;



let url1 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv";
let url2 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds1000.csv";
let url3 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds500.csv";
let url4 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds5000.csv";

let url = url3;




function makeMatrix(height, width, url) {
  startTime = performance.now();
  d3.csv(url).then(function (data) {
    clearDiv();
    data = addIdAttribute(data);
    var x1 = chosenAttributes[0];
    var x2 = chosenAttributes[1];
    var x3 = chosenAttributes[2];
    var y1 = chosenAttributes[3];
    var y2 = chosenAttributes[4];
    var y3 = chosenAttributes[5];
    makeScatterPlot(x1, y1, data, "#main", color, "svg1", height, width);
    makeScatterPlot(x1, y2, data, "#main", color, "svg2", height, width);
    makeScatterPlot(x1, y3, data, "#main", color, "svg3", height, width);
    makeScatterPlot(x2, y1, data, "#main", color, "svg4", height, width);
    makeScatterPlot(x2, y2, data, "#main", color, "svg5", height, width);
    makeScatterPlot(x2, y3, data, "#main", color, "svg6", height, width);
    makeScatterPlot(x3, y1, data, "#main", color, "svg7", height, width);
    makeScatterPlot(x3, y2, data, "#main", color, "svg8", height, width);
    makeScatterPlot(x3, y3, data, "#main", color, "svg9", height, width);
    //createButtons(arrayOfDataPoints);

  })
  endTime = performance.now();
  timetaken = endTime - startTime;
  console.log("Time taken: " + timetaken);
}


//this function takes in two strings that determine the x and y axes based on attributes within dataset
// x=data1, y = data2 
function makeScatterPlot(data1, data2, dataset, cssId, color, id, height, width) {

  dataTypeMap[id + "x"] = data1;
  dataTypeMap[id + "y"] = data2;
  const svg = d3.select(cssId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "" + id)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Add labels for x and y axes
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + 30)
    .text(data1);

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(data2);

  // Get the maximum value of the data points for x and y axes
  const maxData1 = findMaxOfArray(dataset, data1);
  const maxData2 = findMaxOfArray(dataset, data2);

  // Create scales for x and y axes
  const x = d3.scaleLinear()
    .domain([0, maxData1])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, maxData2])
    .range([height, 0]);

  scalesMap[id + "x"] = x;
  scalesMap[id + "y"] = y;

  // Create x and y axis groups and append them to the SVG
  const gX = svg.append("g")
    .classed('x-axis', true)
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(6));


  const gY = svg.append("g")
    .classed('y-axis', true)
    .call(d3.axisLeft(y).ticks(7));


  // Create circles for each data point and append them to the SVG
  svg.append('g')
    .selectAll("dot")
    .data(dataset)
    .join("circle")
    .attr("cx", function (d) { if(!isNaN(d[data1])) {return x((d[data1]));} })
    .attr("cy", function (d) { if(!isNaN(d[data2])) {return y((d[data2]));} })
    .attr("r", 2.5)
    .attr("fill", color)
    .attr("stroke", "black")
    .attr("stroke-width", 0.5);

  // Add a rectangle to enable panning and zooming on whitespace
  const rect = svg.append("rect")
    .attr("class", "background")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "transparent");
  // Create zoom behavior and apply it to the SVG and the rectangle
  const zoom = d3.zoom()
    .scaleExtent([0.25, 10])
    .on('zoom', function (e) { handleZoom(e, x, y, data1, data2, svg, height, width, id) });

  rect.call(zoom);
}


function findMaxOfArray(data, datapoint) {
  var max = data[0][datapoint];
  for (var i = 1; i < data.length; i++) {
    if (data[i][datapoint] > max) {
      max = data[i][datapoint];
    }
  }
  //console.log(max);
  return max;
}

function getDatapoints(data) {
  array2 = [];
  array = Object.keys(data[0]);
  for (var item in array) {
    var x = data[0][array[item]];
    x = Number(x);
    if (!isNaN(x)) {
      array2.push(array[item]);
    }
  }
  //array2 = [...map.keys()];
  //console.log(array2);
  //console.log(map);
  return array2;

}

function buttonFunction1() {
  document.getElementById("my_dataviz").innerHTML = "";
  d3.csv(url).then(function (data) {
    makeScatterPlot("z", "y", data, "#my_dataviz", "green");
  })
}

function buttonFunction2() {
  document.getElementById("my_dataviz").innerHTML = "";
  d3.csv(url).then(function (data) {
    makeScatterPlot("x", "y", data, "#my_dataviz", "red");
  })
}



// function createButtons(array){
//     for(var item in array){
//         let btn = document.createElement("button");
//         btn.innerHTML = array[item];
//         btn.type = "text";
//         btn.name = array[item];
//         btn.className = "databutton";
//         btn.onclick = function () {
//             alert("Button is clicked");
//           };
//         document.body.appendChild(btn);
//     }
// }





// function zoomIn() {
// 	d3.select('svg#svg9')
// 		.transition()
// 		.call(zoom.scaleBy, 2);
// }

// function zoomOut() {
// 	d3.select('svg#svg9')
// 		.transition()
// 		.call(zoom.scaleBy, 0.5);
// }

// function resetZoom() {
// 	d3.select('svg#svg9')
// 		.transition()
// 		.call(zoom.scaleTo, 1);
// }

// function center() {
// 	d3.select('svg#svg9')
// 		.transition()
// 		.call(zoom.translateTo, 0.5 * width, 0.5 * height);
// }

// function panLeft() {
// 	d3.select('svg#svg9')
// 		.transition()
// 		.call(zoom.translateBy, -50, 0);
// }

// function panRight() {
// 	d3.select('svg#svg9')
// 		.transition()
// 		.call(zoom.translateBy, 50, 0);
// }

function handleZoom(e, x, y, data1, data2, svg, height, width, id) {
  const newXScale = e.transform.rescaleX(x);
  const newYScale = e.transform.rescaleY(y);

  if (e.transform.k <= 0.5) {
    d3.csv(url).then(function (data) {
      replaceScatterWithContour(data, data1, data2, id, width, height);
    })
  }


  // Update the x and y scales based on the rescaled domain of the zoom event
  newXScale.domain(e.transform.rescaleX(x).domain());
  newYScale.domain(e.transform.rescaleY(y).domain());

  scalesMap[id + "x"] = newXScale;
  scalesMap[id + "y"] = newYScale;
  xAxis = svg.select("g.x-axis");
  yAxis = svg.select("g.y-axis");


  xAxis.call(d3.axisBottom(newXScale));
  yAxis.call(d3.axisLeft(newYScale));

  svg.selectAll("circle")
    .attr("cx", function (d) { return newXScale(d[data1]); })
    .attr("cy", function (d) { return newYScale(d[data2]); });

  filterPoints(height, width);

}
function filterPoints(height, width) {

  // select all circles
  d3.selectAll("circle")
    .each(function () {
      if (this.getAttribute("cx") < 0 || this.getAttribute("cy") > height) {
        d3.select(this).attr("class", "invisible");
      }
      else {
        d3.select(this).attr("class", "visible");
      }
    });

}

function resizeDivBool() {
  stopResizeVar = false;
}

// Get the main div element
function resizeDiv() {

  if (stopResizeVar) {
    stopResize()
    return;
  }
  var mainDiv = document.getElementById("main");

  // Add event listeners for the mousedown and touchstart events
  mainDiv.addEventListener("mousedown", function (e) { startResize(e, mainDiv) });
  mainDiv.addEventListener("touchstart", function (e) { startResize(e, mainDiv) });
}

// Define the startResize function
function startResize(e, mainDiv) {
  // Prevent default behavior for the mousedown or touchstart event
  e.preventDefault();

  if (!stopResizeVar) {
    isResizing = true;
  }

  // Get the initial mouse or touch position and dimensions of the main div
  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;
  startWidth = mainDiv.offsetWidth;
  startHeight = mainDiv.offsetHeight;


  // Add event listeners for the mousemove and touchmove events
  document.addEventListener("mousemove", function (e) { resize(e, mainDiv) });
  document.addEventListener("touchmove", function (e) { resize(e, mainDiv) });


  // Add event listeners for the mouseup and touchend events
  document.addEventListener("mouseup", function (e) { stopResize(e, mainDiv) }, { once: true });
  document.addEventListener("touchend", function (e) { stopResize(e, mainDiv) }, { once: true });

}

// Define the resize function
function resize(e, mainDiv) {
  if (!isResizing) {
    return;
  }

  // Calculate the distance the mouse or touch has moved
  var deltaX = (e.clientX || e.touches[0].clientX) - startX;
  var deltaY = (e.clientY || e.touches[0].clientY) - startY;

  // Set the new width and height of the main div
  mainDiv.style.width = (startWidth + deltaX) + "px";
  mainDiv.style.height = (startHeight + deltaY) + "px";
  width = (startWidth + deltaX - margin.left - margin.right) / 4.5
  height = (startHeight + deltaY - margin.top - margin.bottom) / 4.5
}

// Define the stopResize function
function stopResize() {
  // Remove the event listeners for the mouseup and touchend events
  isResizing = false;
  document.removeEventListener("mouseup", stopResize);
  document.removeEventListener("touchend", stopResize);

  // Remove the event listeners for the mousemove and touchmove events
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("touchmove", resize);
  //document.replaceWith(document.cloneNode(true));
  makeMatrix(height, width, url);
}

function stopResizeBool() {
  stopResizeVar = true;
}

function clearDiv() {
  document.getElementById("main").innerHTML = "";
}



function makeContourPlot(data, data1, data2, width, height, id) {
  const maxData1 = findMaxOfArray(data, data1);
  const maxData2 = findMaxOfArray(data, data2);

  // Set up the scales
  const x = d3.scaleLinear()
    .domain([0, maxData1])
    .range([0, width]);
  const y = d3.scaleLinear()
    .domain([0, maxData2])
    .range([height, 0]);

  //const zScale = d3.scaleLinear().domain([0, 100]).range([0, 255]);

  // Set up the color scale
  //const colorScale = d3.scaleSequential(zScale).interpolator(d3.interpolateViridis);

  // Set up the contour generator
  const contourGenerator = d3
    .contourDensity()
    .x((d) => x(d[data1]))
    .y((d) => y(d[data2]))
    .size([width, height])
    .bandwidth(7);

  // Generate the contours
  const contours = contourGenerator(data);


  // Add the contours to the chart

  let svg = d3.select("#" + id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "" + id)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + 30)
    .text(data1);

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(data2);


  svg
    .append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(7))

  // Add y axis

  svg
    .append("g")
    .classed("y-axis", true)
    .call(d3.axisLeft(y).ticks(7))


  svg
    .selectAll("path")
    .data(contours)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("fill", "none")
    .attr("stroke", color2)

  // Add a rectangle to enable panning and zooming on whitespace
  const rect = svg.append("rect")
    .attr("class", "background")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "transparent");



  let zoom = d3.zoom()
    .scaleExtent([0.25, 10])
    .on("zoom", function (e) {
      handleZoomContour(e, x, y, data, data1, data2, svg, contourGenerator);
    });

  rect.call(zoom);
  svg.select(".x-axis").raise();
  svg.select(".y-axis").raise();
}


function handleZoomContour(e, x, y, data, data1, data2, svg, contourGenerator) {

  const newXScale = e.transform.rescaleX(x);
  const newYScale = e.transform.rescaleY(y);

  // Update the x and y scales based on the rescaled domain of the zoom event
  newXScale.domain(e.transform.rescaleX(x).domain());
  newYScale.domain(e.transform.rescaleY(y).domain());

  xAxis = svg.select(".x-axis");
  yAxis = svg.select(".y-axis");

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
    .attr("stroke", function (d) {
      // Check if the stroke color is already green
      if (d3.select(this).attr("stroke") == color2) {
        return color2; // Keep green stroke color
      } else {
        return "black"; // Set to default stroke color
      }
    });

  // Add new paths for any new data points that appear after zooming
  contourPaths.enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("fill", "none")
    .attr("stroke", color2);

  // Remove any paths that are no longer needed after zooming
  contourPaths.exit().remove();

  // Update the x and y axes with the new scales
  xAxis.call(d3.axisBottom(newXScale));
  yAxis.call(d3.axisLeft(newYScale));

}


function replaceScatterWithContour(data, data1, data2, id, width, height) {
  svg = document.getElementById(id).innerHTML = "";
  makeContourPlot(data, data1, data2, width, height, id);
}

makeMatrix(height, width, url);


// function updateMatrix(){
//   makeMatrix(height,width,url3);
//   if(contourBool){
//   replaceSvg();
//   }
// }


function replaceSvg() {
  var x1 = chosenAttributes[0];
  var x2 = chosenAttributes[1];
  var x3 = chosenAttributes[2];
  var y1 = chosenAttributes[3];
  var y2 = chosenAttributes[4];
  var y3 = chosenAttributes[5];
  d3.csv(url).then(function (data) {
    replaceScatterWithContour(data, x1, y1, "svg1", width, height)
    replaceScatterWithContour(data, x1, y2, "svg2", width, height)
    replaceScatterWithContour(data, x1, y3, "svg3", width, height)
    replaceScatterWithContour(data, x2, y1, "svg4", width, height)
    replaceScatterWithContour(data,  x2, y2, "svg5", width, height)
    replaceScatterWithContour(data,  x2, y3, "svg6", width, height)
    replaceScatterWithContour(data,  x3, y1, "svg7", width, height)
    replaceScatterWithContour(data,  x3, y2, "svg8", width, height)
    replaceScatterWithContour(data,  x3, y3, "svg9", width, height)
  })
}


function brushMatrix() {

  d3.csv(url).then(function (data) {
    for (var i = 1; i <= 9; i++) {
      var svg = d3.select("#svg" + i);
      const brushedFn = function (id) {
        return function (e) {
          brushed(e, data, id);
        }
      }
      const brush = d3.brush()
        .extent([[0, 0], [width + margin.left + margin.right, height + margin.top + margin.bottom]])
        .on("brush", brushedFn(`svg${i}`));
      svg.append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(brush);
    }
  });
}


function brushed(event, data, id) {
  const selection = event.selection;
  var linkedSvgs = [];
  data = addIdAttribute(data);

  if (id == "svg1") {
    linkedSvgs = ["svg2", "svg3", "svg4", "svg5", "svg6", "svg7", "svg8", "svg9"];
  }

  if (id == "svg2") {
    linkedSvgs = ["svg1", "svg3", "svg4", "svg5", "svg6", "svg7", "svg8", "svg9"];
  }

  if (id == "svg3") {
    linkedSvgs = ["svg2", "svg1", "svg4", "svg5", "svg6", "svg7", "svg8", "svg9"];
  }
  if (id == "svg4") {
    linkedSvgs = ["svg2", "svg3", "svg1", "svg5", "svg6", "svg7", "svg8", "svg9"];
  }
  if (id == "svg5") {
    linkedSvgs = ["svg2", "svg3", "svg4", "svg1", "svg6", "svg7", "svg8", "svg9"];
  }
  if (id == "svg6") {
    linkedSvgs = ["svg2", "svg3", "svg4", "svg5", "svg1", "svg7", "svg8", "svg9"];
  }
  if (id == "svg7") {
    linkedSvgs = ["svg2", "svg3", "svg4", "svg5", "svg6", "svg1", "svg8", "svg9"];
  }
  if (id == "svg8") {
    linkedSvgs = ["svg2", "svg3", "svg4", "svg5", "svg6", "svg7", "svg1", "svg9"];
  }
  if (id == "svg9") {
    linkedSvgs = ["svg2", "svg3", "svg4", "svg5", "svg6", "svg7", "svg8", "svg1"];
  }


  if (selection) {
    // Get the selected x and y values
    const [[x0, y0], [x1, y1]] = selection;
    let circles = d3.select("#" + id).selectAll("circle");
    let circles2 = d3.select("#" + linkedSvgs[0]).selectAll("circle");
    let circles3 = d3.select("#" + linkedSvgs[1]).selectAll("circle");
    let circles4 = d3.select("#" + linkedSvgs[2]).selectAll("circle");
    let circles5 = d3.select("#" + linkedSvgs[3]).selectAll("circle");
    let circles6 = d3.select("#" + linkedSvgs[4]).selectAll("circle");
    let circles7 = d3.select("#" + linkedSvgs[5]).selectAll("circle");
    let circles8 = d3.select("#" + linkedSvgs[6]).selectAll("circle");
    let circles9 = d3.select("#" + linkedSvgs[7]).selectAll("circle");


    //console.log(circles);
    xScale = scalesMap[id + "x"];
    yScale = scalesMap[id + "y"];
    xValue = dataTypeMap[id + "x"];
    yValue = dataTypeMap[id + "y"];
    //xScale2 = scalesMap["svg2x"];

    // Filter the data based on the selected values
    const selectedData = data.filter(d => xScale(d[xValue]) >= x0 && xScale(d[xValue]) <= x1 && yScale(d[yValue]) >= y0 && yScale(d[yValue]) <= y1);
    //const selectedData2 = data.filter(d => xScale(d["x"]) >= x0 && xScale(d["x"]) <= x1 && yScale(d["z"]) >= y0 && yScale(d["z"]) <= y1);
    //const selectedData3 = data.filter(d => xScale(d["x"]) >= x0 && xScale(d["x"]) <= x1 && yScale(d["carat"]) >= y0 && yScale(d["carat"]) <= y1);
    // // Update the circles in the first scatterplot
    circles.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles2.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles3.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles4.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles5.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles6.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles7.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles8.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);
    circles9.attr("fill", d => selectedData.map(e => e.id).includes(d.id) ? "blue" : color);

    circles.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles2.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles3.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles4.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles5.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles6.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles7.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles8.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
    circles9.attr("r", d => selectedData.map(e => e.id).includes(d.id) ? "4" : "2.5");
  }
}


function stopBrush() {
  makeMatrix(height, width, url)
}


function setUrl500() {
  url = url3;
  chosenAttributes = ["x", "depth", "table", "y", "z", "carat"];
  makeMatrix(height, width, url)
}

function setUrl1000() {
  url = url2;
  chosenAttributes = ["x", "depth", "table", "y", "z", "carat"];
  makeMatrix(height, width, url)
}


function setUrl5000() {
  url = url4;
  chosenAttributes = ["x", "depth", "table", "y", "z", "carat"];
  makeMatrix(height, width, url)
}

function setUrlFull() {
  url = url1;
  chosenAttributes = ["x", "depth", "table", "y", "z", "carat"];
  makeMatrix(height, width, url)
}


d3.select("#submit-button")
  .on("click", function () {
    url = d3.select("#url-input").node().value;
    
    // Use Fetch API to make a request to the URL and check the response status
    fetch(url, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // If response status is OK (2xx), load the data with d3.csv()
          clearDropDowns();
          d3.csv(url).then(function (data) {
            addDropdownValues(data);
          });
        } else {
          // If response status is not OK, alert the user
          alert("Data cannot be accessed from this URL.");
        }
      })
      .catch(error => {
        // If an error occurs, alert the user
        alert("Error: Unable to access data at this url or url is not valid");
      });
  });



function addDropdownValues(data) {
  // Get a reference to the select element
  var dropdown = document.getElementById("dropdown");
  var dropdown2 = document.getElementById("dropdown2");
  var dropdown3 = document.getElementById("dropdown3");
  var dropdown4 = document.getElementById("dropdown4");
  var dropdown5 = document.getElementById("dropdown5");
  var dropdown6 = document.getElementById("dropdown6");

  var attributeArray = getDatapoints(data);

  // Loop through the options and create an option element for each one
  for (var i = 0; i < attributeArray.length; i++) {
    var option = document.createElement("option");
    option.value = attributeArray[i];
    option.text = attributeArray[i];

    var option2 = document.createElement("option");
    option2.value = attributeArray[i];
    option2.text = attributeArray[i];

    var option3 = document.createElement("option");
    option3.value = attributeArray[i];
    option3.text = attributeArray[i];

    var option4 = document.createElement("option");
    option4.value = attributeArray[i];
    option4.text = attributeArray[i];

    var option5 = document.createElement("option");
    option5.value = attributeArray[i];
    option5.text = attributeArray[i];

    var option6 = document.createElement("option");
    option6.value = attributeArray[i];
    option6.text = attributeArray[i];

    dropdown.appendChild(option);
    dropdown2.appendChild(option2);
    dropdown3.appendChild(option3);
    dropdown4.appendChild(option4);
    dropdown5.appendChild(option5);
    dropdown6.appendChild(option6);
  }
}


d3.select("#submit-button2")
  .on("click", function () {
    var dropdown = document.getElementById("dropdown");
    var dropdown2 = document.getElementById("dropdown2");
    var dropdown3 = document.getElementById("dropdown3");
    var dropdown4 = document.getElementById("dropdown4");
    var dropdown5 = document.getElementById("dropdown5");
    var dropdown6 = document.getElementById("dropdown6");
    chosenAttributes[0] = dropdown.value;
    chosenAttributes[1] = dropdown2.value;
    chosenAttributes[2] = dropdown3.value;
    chosenAttributes[3] = dropdown4.value;
    chosenAttributes[4] = dropdown5.value;
    chosenAttributes[5] = dropdown6.value;
    makeMatrix(height, width, url);
  });

function clearDropDowns() {
  var dropdown = document.getElementById("dropdown");
  var dropdown2 = document.getElementById("dropdown2");
  var dropdown3 = document.getElementById("dropdown3");
  var dropdown4 = document.getElementById("dropdown4");
  var dropdown5 = document.getElementById("dropdown5");
  var dropdown6 = document.getElementById("dropdown6");

  removeOptions(dropdown);
  removeOptions(dropdown2);
  removeOptions(dropdown3);
  removeOptions(dropdown4);
  removeOptions(dropdown5);
  removeOptions(dropdown6);
}

function removeOptions(selectElement) {
  while (selectElement.options.length > 0) {
    selectElement.remove(0);
  }
}


function addIdAttribute(data) {
  data.forEach(function (d, i) {
    if (!d.hasOwnProperty('id')) { // check if 'id' property already exists
      d.id = i; // if not, assign an id to the datapoint
    }
  });
  return data;
}
