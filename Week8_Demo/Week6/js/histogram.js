
const drawHistogram = (data) => {
    //set the dimension and margins of chart area
    const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0, 0, ${width} ${height}`) //Responsive SVG

    const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

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
}