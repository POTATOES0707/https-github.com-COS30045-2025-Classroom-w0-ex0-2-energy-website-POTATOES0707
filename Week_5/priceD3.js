
const drawLineChart = data => {
    const margin = { top: 20, right: 100, bottom: 50, left: 100 };
    const width = 1000;
    const height = 500;   
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`)

    const firstDate = d3.min(data, d => d.year);
    const lastDate = d3.max(data, d => d.year); 

    const xScale = d3.scaleTime()
    .domain([new Date(firstDate, 0), new Date(lastDate, 0)])
    .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.price) - 20, d3.max(data, d => d.price)])
        .range([innerHeight, 0]);

    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const bottomAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat("%Y"));
    const leftAxis = d3.axisLeft(yScale);

    innerChart
    .append("g")
    .attr("class", "x-axis")
    .call(bottomAxis)   
    .attr("transform", `translate(${0}, ${innerHeight})`); 

    innerChart
    .append("g")
    .attr("class", "y-axis")
    .call(leftAxis)
    .attr("y", 20);

    const lineGenerator = d3.line()
    .x(d => xScale(new Date(d.year, 0)))
    .y(d => yScale(d.price))
    .curve(d3.curveCardinal);

    innerChart.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#E754B3")
    .attr("stroke-width", 3)
    .attr("d", lineGenerator);

    const last = data[data.length - 1];
    innerChart.append("text")
        .attr("x", xScale(new Date(last.year, 0)) + 5)
        .attr("y", yScale(last.price))
        .attr("fill", "#E754B3")
        .text("Average")
        .style("font-size", "14px")
        .style("font-family", "sans-serif");

        innerChart.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-90)`)
        .attr("x", -innerHeight / 2)
        .attr("y", -60)
        .text("Price ($ Per Megawatt hour)");

};

d3.csv("Ex5_ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        price: +d["Average Price (notTas-Snowy)"],
    };
}).then(data => {
    console.log(data);
    drawLineChart(data);
});