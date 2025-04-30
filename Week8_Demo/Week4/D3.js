// D3.js
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

const margin = { top: 20, right: 20, bottom: 20, left: 100 }; 
const width = 1000 - margin.left - margin.right;
const height = 1500 - margin.top - margin.bottom;

const CreateBarChart = data => {
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, width]); 

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, height]) 
    .padding(0.3);

  const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left + 100}, ${0})`);

  chartGroup
    .selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue");

  // Label: Count inside bar (right-aligned)
  chartGroup.selectAll("text.count-label")
    .data(data)
    .join("text")
    .attr("class", "count-label")
    .attr("x", d => xScale(d.count) - 5)
    .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2 + 5)
    .attr("text-anchor", "end")
    .attr("fill", "white")
    .style("font-size", "12px")
    .text(d => d.count);

  // Label: Brand name before bar
  chartGroup.selectAll("text.brand-label")
    .data(data)
    .join("text")
    .attr("class", "brand-label")
    .attr("x", -10)
    .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2 + 5)
    .attr("text-anchor", "end")
    .attr("fill", "black")
    .style("font-size", "12px")
    .text(d => d.brand);
};

d3.csv("tvs.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d.count 
  };
}).then(data => {
  data.sort((a, b) => b.count - a.count);
  CreateBarChart(data);
});
