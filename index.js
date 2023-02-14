
var maxX;
var maxY;
var maxTable;
var maxDepth;
var maxZ;
var maxCarat;
function findMax(data){
    xArray = [];
    yArray = [];
    tableArray = [];
    depthArray = [];
    zArray = [];
    caratArray = [];

    for(var datapoint in data){
        if(!isNaN(data[datapoint].x)){
        xArray.push(Number(data[datapoint].x));
        }
        if(!isNaN(data[datapoint].y)){
            yArray.push(Number(data[datapoint].y));
        }
        if(!isNaN(data[datapoint].table)){
            tableArray.push(Number(data[datapoint].table));
        }
        if(!isNaN(data[datapoint].depth)){
            depthArray.push(Number(data[datapoint].depth));
        }
        if(!isNaN(data[datapoint].z)){
            zArray.push(Number(data[datapoint].z));
        }
        if(!isNaN(data[datapoint].carat)){
            caratArray.push(Number(data[datapoint].carat));
        }
    }
    maxX = Math.max(...xArray);
    maxY = Math.max(...yArray);
    maxDepth = Math.max(...depthArray);
    maxTable = Math.max(...tableArray);
    maxZ = Math.max(...zArray);
    maxCarat = Math.max(...caratArray);

}
// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    
//Read the data
d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv").then(function (data) {
    findMax(data);
        let arrayOfDataPoints = getDatapoints(data);
        createButtons(arrayOfDataPoints);
    	makeScatterPlot("x", "y", data, "#my_dataviz", "red",1);
        makeScatterPlot("x", "z", data, "#my_dataviz2", "green",2);
        makeScatterPlot("x", "carat", data, "#my_dataviz3", "blue",3);
        makeScatterPlot("depth", "y", data, "#my_dataviz4", "red",4);
        makeScatterPlot("depth", "z", data, "#my_dataviz5", "green",5);
        makeScatterPlot("depth", "carat", data, "#my_dataviz6", "blue",6);
        makeScatterPlot("table", "y", data, "#my_dataviz7", "red",7);
        makeScatterPlot("table", "z", data, "#my_dataviz8", "green",8);
        makeScatterPlot("table", "carat", data, "#my_dataviz9", "blue",9);

})


//this function takes in two strings that determine the x and y axes based on attributes within dataset
// x=data1, y = data2 
function makeScatterPlot(data1 ,data2, dataset, cssId, color, id ){

    let zoom = d3.zoom()
	.scaleExtent([0.25, 10])
	.on('zoom', handleZoom);


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
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(zoom);

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
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, maxData2])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

        svg.append('g')
        .selectAll("dot")
        .data(dataset)
        .join("circle")
        .attr("cx", function (d) { return x((d[data1])); })
        .attr("cy", function (d) { return y(d[data2]); })
        .attr("r", 4)
        .style("fill", color)
        .style("stroke", "black");

    

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
    d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv").then(function (data) {
    makeScatterPlot("z", "y", data, "#my_dataviz", "green");
    })
}

function buttonFunction2(){
    document.getElementById("my_dataviz").innerHTML = "";
    d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv").then(function (data) {
    makeScatterPlot("x", "y", data, "#my_dataviz", "red");
    })
}



function createButtons(array){
    for(var item in array){
        let btn = document.createElement("button");
        btn.innerHTML = array[item];
        btn.type = "text";
        btn.name = array[item];
        btn.className = "databutton";
        btn.onclick = function () {
            alert("Button is clicked");
          };
        document.body.appendChild(btn);
    }
}





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

function handleZoom(e) {
	d3.select('svg#svg9')
		.attr('transform', e.transform);
}

