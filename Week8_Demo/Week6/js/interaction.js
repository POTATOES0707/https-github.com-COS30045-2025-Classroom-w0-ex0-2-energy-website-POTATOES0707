const populateFilters = (data) => {
    const filters_screen = [
        { id: "all", label: "All", isActive: true },
        { id: "LCD", label: "LCD", isActive: false },
        { id: "LED", label: "LED", isActive: false },
        { id: "OLED", label: "OLED", isActive: false },
    ];

    d3.select("#filters_screen")
        .selectAll("button")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .attr("id", d => d.id)
        .text(d => d.label)
        .on("click", (event, d) => {
            filters_screen.forEach(btn => btn.isActive = (btn.id === d.id));

            d3.selectAll(".filter")
                .classed("active", btn => btn.id === d.id);

            updateHistogram(d.id, data);
        });
};

const updateHistogram = (filterId, data) => {
    const filteredData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

    const updateBins = binGenerator(filteredData); //save the bins into an array

    d3.selectAll("#histogram rect") 
    .data(updateBins) //Bind the data to the rectangles
    .transition()
    .duration(1000) //Add a transition for 1 second
        .attr("x", d => xScale(d.x0)) //Set the x position of the rectangles
        .attr("y", d => yScale(d.length)) //Set the y position of the rectangles
        .attr("width", d => xScale(d.x1) - xScale(d.x0)) //Set the width of the rectangles
        .attr("height", d => innerheight - yScale(d.length)); //Set the height of the rectangles
};
