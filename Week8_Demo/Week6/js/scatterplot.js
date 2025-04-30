
const drawScatterplot = (data) => {
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xExtent = d3.extent(data, d => d.star);
    xExtent[0] = 0; 

    const yExtent = d3.extent(data, d => d.energyConsumption);

    xScales
        .domain(xExtent)
        .range([0, innerwidth])
        .nice();

    yScales
        .domain(yExtent)
        .range([innerheight, 0])
        .nice();

    const bottomAxis = d3.axisBottom(xScales);
    const leftAxis = d3.axisLeft(yScales);

    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerheight})`)
        .call(bottomAxis);

    innerChartS.append("g")
        .call(leftAxis);

    innerChartS.append("text")
    .attr("class", "x axis-label")
    .attr("x", innerwidth / 2)
    .attr("y", innerheight + 40)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Star Rating");

    innerChartS.append("text")
        .attr("class", "y axis-label")
        .attr("x", -innerheight / 2)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Labeled Energy Consumption (kWh/year)");

    const screenTechs = [...new Set(data.map(d => d.screenTech))];

    colorScale
        .domain(screenTechs)
        .range(d3.schemeCategory10);

    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScales(d.star))
        .attr("cy", d => yScales(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5);

    const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right - 100}, ${margin.top})`);

    screenTechs.forEach((tech, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", colorScale(tech));

        legendRow.append("text")
            .attr("x", 18)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .text(tech);
    });
}

const createTooltip = (data) => {

    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("fill", "black")
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("opacity", 0.75);

    tooltip.append("text")
        .text("NA")
        .attr("x", tooltipWidth/2)
        .attr("y", tooltipHeight/2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
}

const handleMouseEvents = () => {

    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            d3.select(".tooltip text")
            .text(d.screenSize);

            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            d3.select(".tooltip")
            .attr("transform", `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5*tooltipHeight})`)
            .transition()
            .duration(200)
            .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            d3.select(".tooltip")
            .style("opacity", 0)
            .attr("transform", `translate(0, 500)`);
        });
}