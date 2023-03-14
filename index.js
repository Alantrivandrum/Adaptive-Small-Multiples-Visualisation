var stopResizeVar = false;
var contourBool = false;
// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 50, left: 60 };
    //width = 350 - margin.left - margin.right,
    //height = 300 - margin.top - margin.bottom;
    let width = document.getElementById("main").offsetWidth/4.5;
    let height = document.getElementById("main").offsetHeight/4.5;

    
//Read the data
let url1 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv";
let url2 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds%20reduced.csv";
let url3 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds500.csv";




function makeMatrix(height,width, url){
d3.csv(url).then(function (data) {
        clearDiv();
        let arrayOfDataPoints = getDatapoints(data);
    	makeScatterPlot("x", "y", data, "#main", "red","svg1", height,width);
        makeScatterPlot("x", "z", data, "#main", "green","svg2",height, width);
        makeScatterPlot("x", "carat", data, "#main", "blue","svg3",height, width);
        makeScatterPlot("depth", "y", data, "#main", "red","svg4", height, width);
        makeScatterPlot("depth", "z", data, "#main", "green","svg5", height, width);
        makeScatterPlot("depth", "carat", data, "#main", "blue","svg6", height, width);
        makeScatterPlot("table", "y", data, "#main", "red","svg7", height, width);
        makeScatterPlot("table", "z", data, "#main", "green","svg8", height, width);
        makeScatterPlot("table", "carat", data, "#main", "blue","svg9", height, width);
        //createButtons(arrayOfDataPoints);

})
}


//this function takes in two strings that determine the x and y axes based on attributes within dataset
// x=data1, y = data2 
function makeScatterPlot(data1 ,data2, dataset, cssId, color, id , height, width){


    // function initZoom() {
    // 	d3.select('svg#svg9')
    // 		.call(zoom);
    // }
    
    
    
        const svg = d3.select(cssId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)    
        .attr("id", ""+id)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    
        // svg.append("g")
        //     .attr("class", "hidden rectangle")
        // .append("rect")
        //     .attr("class", "background")
        //     .attr("x",0)
        //     .attr("y",height)
        //     .attr("width", width)
        //     .attr("height", 0);
    
        svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height+30)
        .text(data1);
    
        svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -margin.left+20 )
        .attr("x", -height/2)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text(data2);
    
        
        
        maxData1 = findMaxOfArray(dataset,data1);
        maxData2 = findMaxOfArray(dataset,data2);
    
        const x = d3.scaleLinear()
            .domain([0, maxData1])
            .range([0, width]);
    
        gX = svg.append("g")
            .classed('x-axis', true)
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
    
        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, maxData2])
            .range([height, 0]);
    
        
        gY = svg.append("g")
            .classed('y-axis', true) 
            .call(d3.axisLeft(y));
    
            svg.append('g')
            .selectAll("dot")
            .data(dataset)
            .join("circle")
            .attr("cx", function (d) { return x((d[data1])); })
            .attr("cy", function (d) { return y(d[data2]); })
            .attr("r", 3)
            .style("fill", color)
            .style("stroke", "black");
    
        
        let zoom = d3.zoom()
        .scaleExtent([0.25, 10])
        .on('zoom', function(e){handleZoom(e,x,y,data1,data2,svg, height, width)});
    
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

function getDatapoints(data){
    array2 = [];
    array = Object.keys(data[0]);
    for(var item in array){
        var x = data[0][array[item]];
        x = Number(x);
        if(!isNaN(x)){
            array2.push(array[item]);
        }
    }
    //array2 = [...map.keys()];
    //console.log(array2);
    //console.log(map);
    return array2;
  
}

function buttonFunction1(){
    document.getElementById("my_dataviz").innerHTML = "";
    d3.csv(url3).then(function (data) {
    makeScatterPlot("z", "y", data, "#my_dataviz", "green");
    })
}

function buttonFunction2(){
    document.getElementById("my_dataviz").innerHTML = "";
    d3.csv(url3).then(function (data) {
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

function handleZoom(e, x, y, data1, data2, svg, height, width) {
    const newXScale = e.transform.rescaleX(x);
    const newYScale = e.transform.rescaleY(y);

    // Update the x and y scales based on the rescaled domain of the zoom event
    newXScale.domain(e.transform.rescaleX(x).domain());
    newYScale.domain(e.transform.rescaleY(y).domain());
   
    xAxis = svg.select("g.x-axis");
    yAxis = svg.select("g.y-axis");


    xAxis.call(d3.axisBottom(newXScale));
    yAxis.call(d3.axisLeft(newYScale));

    svg.selectAll("circle")
        .attr("cx", function(d) { return newXScale(d[data1]); })
        .attr("cy", function(d) { return newYScale(d[data2]); });

    filterPoints(height, width);

}
function filterPoints(height, width) {

    // select all circles
    d3.selectAll("circle")
      .each(function() {
        if(this.getAttribute("cx") < 0 || this.getAttribute("cy") > height){
            d3.select(this).attr("class", "invisible");
        }
        else{
            d3.select(this).attr("class", "visible");
        }
      });
    
    }
    
function resizeDivBool(){
  stopResizeVar = false;
}

// Get the main div element
function resizeDiv(){

  if(stopResizeVar){
    return;
  }
var mainDiv = document.getElementById("main");

// Add event listeners for the mousedown and touchstart events
mainDiv.addEventListener("mousedown", function(e){startResize(e,mainDiv)});
mainDiv.addEventListener("touchstart", function(e){startResize(e,mainDiv)});
}

// Define the startResize function
function startResize(e, mainDiv) {
  // Prevent default behavior for the mousedown or touchstart event
  e.preventDefault();

  if(!stopResizeVar){
  isResizing = true;
  }
  
  // Get the initial mouse or touch position and dimensions of the main div
  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;
  startWidth = mainDiv.offsetWidth;
  startHeight = mainDiv.offsetHeight;
  
  
  // Add event listeners for the mousemove and touchmove events
  document.addEventListener("mousemove", function(e){ resize(e, mainDiv)});
  document.addEventListener("touchmove", function(e){ resize(e, mainDiv)});
  
  
  // Add event listeners for the mouseup and touchend events
  document.addEventListener("mouseup", function(e) {stopResize(e, mainDiv)});
  document.addEventListener("touchend", function(e) {stopResize(e, mainDiv)});

}

// Define the resize function
function resize(e, mainDiv) {
  if(!isResizing){
    return;
  }

  // Calculate the distance the mouse or touch has moved
  var deltaX = (e.clientX || e.touches[0].clientX) - startX;
  var deltaY = (e.clientY || e.touches[0].clientY) - startY;
  
  // Set the new width and height of the main div
  mainDiv.style.width = (startWidth + deltaX) + "px";
  mainDiv.style.height = (startHeight + deltaY) + "px";
  width = (startWidth + deltaX - margin.left - margin.right)/4.5
  height = (startHeight+deltaY - margin.top - margin.bottom)/4.5
}

// Define the stopResize function
function stopResize(e, mainDiv) {
  // Remove the event listeners for the mouseup and touchend events
  isResizing = false;
  document.removeEventListener("mouseup", stopResize);
  document.removeEventListener("touchend", stopResize);
  
  // Remove the event listeners for the mousemove and touchmove events
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("touchmove", resize);
  updateMatrix();
}

function stopResizeBool(){
  stopResizeVar = true;
}

function clearDiv()
{
    document.getElementById("main").innerHTML = "";
}

function makeContourPlot(data, data1, data2, width, height, id) {
    const maxData1 = findMaxOfArray(data, data1);
    const maxData2 = findMaxOfArray(data, data2);
  
    // Set up the scales
    const x = d3.scaleLinear()
              .domain([0, maxData1])
              .range([0,width]);
    const y = d3.scaleLinear()
              .domain([0, maxData2])
              .range([height,0]);

    //const zScale = d3.scaleLinear().domain([0, 100]).range([0, 255]);
  
    // Set up the color scale
    //const colorScale = d3.scaleSequential(zScale).interpolator(d3.interpolateViridis);
  
    // Set up the contour generator
    const contourGenerator = d3
      .contourDensity()
      .x((d) => x(d[data1]))
      .y((d) => y(d[data2]))
      .size([width, height])
      .bandwidth(25);
  
    // Generate the contours
    const contours = contourGenerator(data);
  
    // Add the contours to the chart
    const svg = d3.select("#"+id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)    
    .attr("id", ""+id)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height+30)
    .text(data1);

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -margin.left+20 )
    .attr("x", -height/2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(data2);

    
    svg
      .append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
  
    // Add y axis

    svg
      .append("g")
      .classed("y-axis", true)
      .call(d3.axisLeft(y))
  
  
    svg
      .selectAll("path")
      .data(contours)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      .attr("fill", "none")
      .attr("stroke", "green")
      
  

    let zoom = d3.zoom()
      .scaleExtent([0.25, 10])
      .on("zoom", function (e) {
        handleZoomContour(e, x, y, data, data1, data2, svg, contourGenerator);
      });
  
     console.log(svg);
    svg.call(zoom);
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


function replaceScatterWithContour(data,data1, data2, id, width, height){
   svg = document.getElementById(id).innerHTML="";
   makeContourPlot(data, data1, data2,width, height, id);
}

makeMatrix(height, width, url3);


function updateMatrix(){
  makeMatrix(height,width,url3);
  if(contourBool){
  replaceSvg();
  }
}


function replaceSvg(){
    d3.csv(url3).then(function(data){
        replaceScatterWithContour(data,"x","y", "svg1", width, height)
    })
    contourBool = true;
}