
const drawHistogram = (data) => {
    //set the dimension and margins of chart area
    const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0, 0, ${width} ${height}`) //Responsive SVG

    const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const bins = binGenerator(data); //save the bins into an array

console.log(bins); //Log the bins to the console for debugging

const minEng = bins[0].x0; //Get the minimum energy consumption value from the first bin    
const maxEng = bins[bins.length - 1].x1; //Get the maximum
const binsMaxLength = d3.max(bins, d => d.length); //Get the maximum length of the bins

xScale
.domain([minEng, maxEng])
.range([0, innerwidth]);
yScale
.domain([0, binsMaxLength])
.range([innerheight, 0])
.nice();

innerChart
.selectAll("rect")
.data(bins) //Bind the data to the rectangles
.join("rect")
    .attr("x", d => xScale(d.x0)) //Set the x position of the rectangles
    .attr("y", d => yScale(d.length)) //Set the y position of the rectangles
    .attr("width", d => xScale(d.x1) - xScale(d.x0)) //Set the width of the rectangles
    .attr("height", d => innerheight - yScale(d.length)) //Set the height of the rectangles
    .attr("fill", barColor) //Set the color of the rectangles
    .attr("stroke", bodyBackgroundColor) //Set the stroke color of the rectangles
    .attr("stroke-width", 2); //Set the stroke width of the rectangles

const bottomAxis = d3.axisBottom(xScale) //Create the x axis
innerChart.append("g")
.attr("transform", `translate(0, ${innerheight})`)
.call(bottomAxis);
innerChart.append("text")
.attr("x", innerwidth)
.attr("y", innerheight + 40)
.attr("text-anchor", "end")
.attr("class", "axis-label")
.text("Labelled Energy Consumption (kWh/year)");

const leftAxis = d3.axisLeft(yScale) //Create the y axis
innerChart.append("g").call(leftAxis);
innerChart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -10)
    .attr("text-anchor", "end")
    .attr("class", "axis-label")
    .text("Frequency");
}