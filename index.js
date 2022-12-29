
// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const svg2 = d3.select("#my_dataviz2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const svg3 = d3.select("#my_dataviz3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const svg4 = d3.select("#my_dataviz4")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


const svg5 = d3.select("#my_dataviz5")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


const svg6 = d3.select("#my_dataviz6")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const svg7 = d3.select("#my_dataviz7")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const svg8 = d3.select("#my_dataviz8")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



const svg9 = d3.select("#my_dataviz9")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds.csv").then(function (data) {
    //console.log(data);

    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 12])
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



    // Add X axis
    const x2 = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg2.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y2 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg2.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg2.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.z); })
        .attr("r", 4)
        .style("fill", "green")
        .style("stroke", "black");

    // Add X axis
    const x3 = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg3.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y3 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg3.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg3.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.carat); })
        .attr("r", 4)
        .style("fill", "blue")
        .style("stroke", "black");

    const x4 = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg4.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y4 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg4.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg4.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.carat); })
        .attr("r", 4)
        .style("fill", "blue")
        .style("stroke", "black");


    const x5 = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg5.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y5 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg5.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg5.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.carat); })
        .attr("r", 4)
        .style("fill", "blue")
        .style("stroke", "black");

    const x6 = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg6.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y6 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg6.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg6.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.carat); })
        .attr("r", 4)
        .style("fill", "blue")
        .style("stroke", "black");

    const y7 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg7.append("g")
        .call(d3.axisLeft(y));

    const x7 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg7.append("g")
        .call(d3.axisLeft(x));

    // Add dots
    svg7.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.carat); })
        .attr("r", 4)
        .style("fill", "blue")
        .style("stroke", "black");


    const x8 = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg8.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y8 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg8.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg8.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.carat); })
        .attr("r", 4)
        .style("fill", "blue")
        .style("stroke", "black");

    const x9 = d3.scaleLinear()
        .domain([0, 12])
        .range([0, width]);
    svg9.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y9 = d3.scaleLinear()
        .domain([0, 12])
        .range([height, 0]);
    svg9.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg9.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x((d.x)); })
        .attr("cy", function (d) { return y(d.carat); })
        .attr("r", 4)
        .style("fill", "blue")
        .style("stroke", "black");


})