// meanEnergyD3.js

const drawDonutChart = data => {
    const width = 500;
    const height = 500;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.screenType))
        .range(d3.schemeCategory10);

    const svg = d3.select("#donut")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", "block")
        .style("margin", "0 auto")
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie()
        .sort(null)
        .value(d => d.mean);

    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.9)
        .cornerRadius(9);

    const arcs = svg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.screenType))
        .attr("stroke", "white")
        .style("stroke-width", "2px");

    const labelArc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.9);

    svg.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .text(d => d.data.screenType)
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "12px");
};

d3.csv("Ex5_TV_energy_Allsizes_byScreenType.csv", d => ({
    screenType: d.Screen_Tech,
    mean: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    drawDonutChart(data);
});
