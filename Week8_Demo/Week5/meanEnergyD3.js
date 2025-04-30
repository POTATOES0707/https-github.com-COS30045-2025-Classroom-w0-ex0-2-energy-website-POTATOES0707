const drawBarChart = data => {
    const margin = { top: 20, right: 100, bottom: 50, left: 100 };
    const width = 1000;
    const height = 500;   
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#bar")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`)

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenType))
        .range([0, innerWidth])
        .padding(0.1);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.mean)])
        .range([innerHeight, 0])
        .nice();

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    innerChart.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.screenType))
    .attr("y", d => yScale(d.mean))
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.mean))
    .attr("fill", "steelblue");

    innerChart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(${0}, ${innerHeight})`)
    .call(xAxis);

    innerChart
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis);

    innerChart.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .text("Screen Technology");

    innerChart.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90)`)
    .attr("x", -innerHeight / 2)
    .attr("y", -60)
    .text("Mean Energy Consumption (kWh/Year)");
};


d3.csv("Ex5_TV_energy_55inchtv_byScreenType.csv", d => {
    return {
        screenType: d.Screen_Tech,
        mean: +d["Mean(Labelled energy consumption (kWh/year))"],
    };
}).then(data => {
    console.log(data);
    drawBarChart(data);
});