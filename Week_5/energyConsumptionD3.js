

const drawScatterPlot = (data) => {
    const margin = { top: 20, right: 100, bottom: 50, left: 100 };
    const width = 1000;
    const height = 500;   
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#scatterPlot")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`)

    const xScale = d3.scaleLinear()
    .domain([
        Math.min(1.5, d3.min(data, d => d.starRating)),
        d3.max(data, d => d.starRating)
      ])
      .range([0, innerWidth]);
  
    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.energyConsumption))
    .range([innerHeight, 0])
    .nice();

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);
    
    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    innerChart
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis);

    innerChart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(${0}, ${innerHeight})`)
    .call(xAxis);

    innerChart.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.starRating))
    .attr("cy", d => yScale(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", "steelblue");

    innerChart.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .text("Star Rating (Energy Efficient)");

    innerChart.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90)`)
    .attr("x", -innerHeight / 2)
    .attr("y", -60)
    .text("Energy Consumption (kWh/Year)");
  }
d3.csv("Ex5_TV_energy.csv", d => {
    return {
        starRating: +d.star2,
        energyConsumption: +d.energy_consumpt,
    };
}).then(data => {
    console.log(data);
    drawScatterPlot(data);
  });



