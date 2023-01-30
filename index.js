
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

    /*
// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height+30)
    .text("x");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -margin.left+20 )
    .attr("x", -height/2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("y");
*/


// const svg2 = d3.select("#my_dataviz2")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     svg2.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("x");

//     svg2.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("z");

// const svg3 = d3.select("#my_dataviz3")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     svg3.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("x");

//     svg3.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("carat");

// const svg4 = d3.select("#my_dataviz4")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     svg4.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("depth");

//     svg4.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("y");


// const svg5 = d3.select("#my_dataviz5")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     svg5.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("depth");

//     svg5.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("z");


// const svg6 = d3.select("#my_dataviz6")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     svg6.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("depth");

//     svg6.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("carat");

// const svg7 = d3.select("#my_dataviz7")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     svg7.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("table");

//     svg7.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("y");

// const svg8 = d3.select("#my_dataviz8")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     svg8.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("table");

//     svg8.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("z");



// const svg9 = d3.select("#my_dataviz9")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);


//     svg9.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width/2)
//     .attr("y", height+30)
//     .text("table");

//     svg9.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20 )
//     .attr("x", -height/2)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("carats");

//Read the data
d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv").then(function (data) {
    findMax(data);
    //console.log(maxY);
    // Add X axis
    /*
    const x = d3.scaleLinear()
        .domain([0, maxX])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, maxY])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 4)
        .style("fill", "red")
        .style("stroke", "black");
*/
    	makeScatterPlot("x", "y", data, "#my_dataviz", "red");
        makeScatterPlot("x", "z", data, "#my_dataviz2", "green");
        makeScatterPlot("x", "carat", data, "#my_dataviz3", "blue");
        makeScatterPlot("depth", "y", data, "#my_dataviz4", "red");
        makeScatterPlot("depth", "z", data, "#my_dataviz5", "green");
        makeScatterPlot("depth", "carat", data, "#my_dataviz6", "blue");
        makeScatterPlot("table", "y", data, "#my_dataviz7", "red");
        makeScatterPlot("table", "z", data, "#my_dataviz8", "green");
        makeScatterPlot("table", "carat", data, "#my_dataviz9", "blue");
        getDatapoints(data);
        //findMaxOfArray(data,"x");

    // // Add X axis
    // const x2 = d3.scaleLinear()
    //     .domain([0, maxX])
    //     .range([0, width]);
    // svg2.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x2));

    // // Add Y axis
    // const y2 = d3.scaleLinear()
    //     .domain([0, maxZ])
    //     .range([height, 0]);
    // svg2.append("g")
    //     .call(d3.axisLeft(y2));

    // // Add dots
    // svg2.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x2((d.x)); })
    //     .attr("cy", function (d) { return y2(d.z); })
    //     .attr("r", 4)
    //     .style("fill", "green")
    //     .style("stroke", "black");

    // // Add X axis
    // const x3 = d3.scaleLinear()
    //     .domain([0, maxX])
    //     .range([0, width]);
    // svg3.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x3));

    // // Add Y axis
    // const y3 = d3.scaleLinear()
    //     .domain([0, maxCarat])
    //     .range([height, 0]);
    // svg3.append("g")
    //     .call(d3.axisLeft(y3));

    // // Add dots
    // svg3.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x3((d.x)); })
    //     .attr("cy", function (d) { return y3(d.carat); })
    //     .attr("r", 4)
    //     .style("fill", "blue")
    //     .style("stroke", "black");

    // const x4 = d3.scaleLinear()
    //     .domain([0, maxDepth])
    //     .range([0, width]);
    // svg4.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x4));

    // // Add Y axis
    // const y4 = d3.scaleLinear()
    //     .domain([0, maxY])
    //     .range([height, 0]);
    // svg4.append("g")
    //     .call(d3.axisLeft(y4));

    // // Add dots
    // svg4.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x4((d.depth)); })
    //     .attr("cy", function (d) { return y4(d.y); })
    //     .attr("r", 4)
    //     .style("fill", "red")
    //     .style("stroke", "black");


    // const x5 = d3.scaleLinear()
    //     .domain([0, maxDepth])
    //     .range([0, width]);
    // svg5.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x5));

    // // Add Y axis
    // const y5 = d3.scaleLinear()
    //     .domain([0, maxZ])
    //     .range([height, 0]);
    // svg5.append("g")
    //     .call(d3.axisLeft(y5));

    // // Add dots
    // svg5.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x5((d.depth)); })
    //     .attr("cy", function (d) { return y5(d.z); })
    //     .attr("r", 4)
    //     .style("fill", "green")
    //     .style("stroke", "black");

    // const x6 = d3.scaleLinear()
    //     .domain([0, maxDepth])
    //     .range([0, width]);
    // svg6.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x6));

    // // Add Y axis
    // const y6 = d3.scaleLinear()
    //     .domain([0, maxCarat])
    //     .range([height, 0]);
    // svg6.append("g")
    //     .call(d3.axisLeft(y6));

    // // Add dots
    // svg6.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x6((d.depth)); })
    //     .attr("cy", function (d) { return y6(d.carat); })
    //     .attr("r", 4)
    //     .style("fill", "blue")
    //     .style("stroke", "black");

    // const y7 = d3.scaleLinear()
    //     .domain([0, maxY])
    //     .range([height, 0]);
    // svg7.append("g")
    //     .call(d3.axisLeft(y7));
    // const x7 = d3.scaleLinear()
    //     .domain([0, maxTable])
    //     .range([0, width]);
    // svg7.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x7));


    // // Add dots
    // svg7.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x7((d.table)); })
    //     .attr("cy", function (d) { return y7(d.y); })
    //     .attr("r", 4)
    //     .style("fill", "red")
    //     .style("stroke", "black");


    // const x8 = d3.scaleLinear()
    //     .domain([0, maxTable])
    //     .range([0, width]);
    // svg8.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x8));

    // // Add Y axis
    // const y8 = d3.scaleLinear()
    //     .domain([0, maxZ])
    //     .range([height, 0]);
    // svg8.append("g")
    //     .call(d3.axisLeft(y8));

    // // Add dots
    // svg8.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x8((d.table)); })
    //     .attr("cy", function (d) { return y8(d.z); })
    //     .attr("r", 4)
    //     .style("fill", "green")
    //     .style("stroke", "black");

    // const x9 = d3.scaleLinear()
    //     .domain([0, maxTable])
    //     .range([0, width]);
    // svg9.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x9));

    // // Add Y axis
    // const y9 = d3.scaleLinear()
    //     .domain([0, maxCarat])
    //     .range([height, 0]);
    // svg9.append("g")
    //     .call(d3.axisLeft(y9));

    // // Add dots
    // svg9.append('g')
    //     .selectAll("dot")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", function (d) { return x9((d.table)); })
    //     .attr("cy", function (d) { return y9(d.carat); })
    //     .attr("r", 4)
    //     .style("fill", "blue")
    //     .style("stroke", "black");


})


//this function takes in two strings that determine the x and y axes based on attributes within dataset
// x=data1, y = data2 
function makeScatterPlot(data1 ,data2, dataset, cssId, color){
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    const svg = d3.select(cssId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
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