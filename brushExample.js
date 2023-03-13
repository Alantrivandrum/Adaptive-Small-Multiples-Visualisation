// Define the data for the scatterplots
let url1 = "https://raw.githubusercontent.com/Alantrivandrum/Diamonds-Dataset/main/diamonds500.csv";


d3.csv(url1).then(function(data){
  // Set the dimensions and margins for the scatterplots
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
  
  const data1 = data;
  const data2 = data;
  // Create the scales for the scatterplots
  const xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]);
  
  // Create the SVG elements for the scatterplots
  const svg1 = d3.select("#scatterplot1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const svg2 = d3.select("#scatterplot2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // Add the x and y axes to the scatterplots
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  
  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
  svg1.append("g")
    .call(yAxis);
  
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
  svg2.append("g")
    .call(yAxis);
  
  // Add the circles to the scatterplots
  const circles1 = svg1.selectAll("circle")
    .data(data1)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("stroke", "black");
  
  const circles2 = svg2.selectAll("circle")
    .data(data2)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.z))
    .attr("r", 5)
    .attr("fill", "green")
    .attr("stroke", "black");
  
  // Add the brush to the scatterplots
  const brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("brush", brushed);
  
  const brush2 = svg2.append("g")
    .call(brush);
  
  svg1.append("g")
    .call(brush);


    function brushed(event) {
        const selection = event.selection;
        if (selection) {
          // Get the selected x values
          const [x0, x1] = selection.map(xScale.invert);
          // Filter the data based on the selected values
          const filteredData1 = data1.filter(d => d.x >= x0 && d.x <= x1);
          const filteredData2 = data2.filter(d => d.x >= x0 && d.x <= x1);
          // Update the circles
          circles1.data(filteredData1, d => d.x)
            .attr("fill", "red")
            .attr("stroke", "black");
          circles1.data(data1.filter(d => !(d.x >= x0 && d.x <= x1)), d => d.x)
            .attr("fill", "blue")
            .attr("stroke", "black");
          circles2.data(filteredData2, d => d.x)
            .attr("fill", "green")
            .attr("stroke", "black");
          circles2.data(data2.filter(d => !(d.x >= x0 && d.x <= x1)), d => d.x)
            .attr("fill", "blue")
            .attr("stroke", "black  ");
        }
      }
      
  
})