//this function takes in two strings that determine the x and y axes based on attributes within dataset
// x=data1, y = data2 
function makeScatterPlot(data1 ,data2, dataset){
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr(x, width/2)
    .attr(y, height+30)
    .text(data1);

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -margin.left+20 )
    .attr("x", -height/2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(data2);
    
    maxData1 = findMaxOfArray(dataset[data1]);
    maxData2 = findMaxOfArray(dataset[data2]);

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
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.data1)); })
        .attr("cy", function (d) { return y(d.data2); })
        .attr("r", 4)
        .style("fill", "red")
        .style("stroke", "black");

    

}

function findMaxOfArray(data){
    return Math.max(...data)
}


