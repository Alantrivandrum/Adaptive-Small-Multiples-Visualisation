const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


   

//this function takes in two strings that determine the x and y axes based on attributes within dataset
// x=data1, y = data2 
function makeScatterPlot(data1 ,data2, dataset, cssId, color, id ){


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

    let zoom = d3.zoom()
.scaleExtent([0.25, 10])
.on('zoom', function(e){handleZoom(e,x,y,data1,data2,svg)});

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

    svg.call(zoom);
    
    maxData1 = findMaxOfArray(dataset,data1);
    maxData2 = findMaxOfArray(dataset,data2);

    const x = d3.scaleLinear()
        .domain([0, maxData1])
        .range([0, width]);
    svg.append("g")
        .classed('x-axis', true)
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, maxData2])
        .range([height, 0]);

    const initialXDomain = x.domain();
    const initialYDomain = y.domain();
    
    svg.append("g")
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

    

}

//Read the data
let url1 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv";
let url2 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds%20reduced.csv";
let url3 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds500.csv";

d3.csv(url3).then(function (data) {

    makeScatterPlot("x", "y", data, "#my_dataviz", "red","1");
})

function zoomIn() {
	d3.select('svg')
		.transition()
		.call(zoom.scaleBy, 2);
}

function zoomOut() {
	d3.select('svg')
		.transition()
		.call(zoom.scaleBy, 0.5);
}

function resetZoom() {
	d3.select('svg')
		.transition()
		.call(zoom.scaleTo, 1);
}

function center() {
	d3.select('svg')
		.transition()
		.call(zoom.translateTo, 0.5 * width, 0.5 * height);
}

function panLeft() {
	d3.select('svg')
		.transition()
		.call(zoom.translateBy, -50, 0);
}

function panRight() {
	d3.select('svg')
		.transition()
		.call(zoom.translateBy, 50, 0);
}

function panUp() {
	d3.select('svg')
		.transition()
		.call(zoom.translateBy, 0, 50);
}

function panDown() {
	d3.select('svg')
		.transition()
		.call(zoom.translateBy, 0, -50);
}

function handleZoom(e, x, y, data1, data2, svg) {
    const newXScale = e.transform.rescaleX(x);
    const newYScale = e.transform.rescaleY(y);

    svg.select(".x.axis")
        .call(d3.axisBottom(newXScale));
    svg.select(".y.axis")
        .call(d3.axisLeft(newYScale));

    svg.selectAll("circle")
        .attr("cx", function(d) { return newXScale(d[data1]); })
        .attr("cy", function(d) { return newYScale(d[data2]); });
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