const populateFilters = (data) => {

    const filters_screen = [
        { id: "all", label: "All", isActive: true },
        { id: "LCD", label: "LCD", isActive: false },
        { id: "LED", label: "LED", isActive: false },
        { id: "OLED", label: "OLED", isActive: false },
    ];

    const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
            .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
            .attr("id", d => d.label)
            .on("click", (e, d) => {

                console.log("Clicked fitler: ", e);
                console.log("Clicked fitler data: ", d);

                if (!d.isActive){

                    filters_screen.forEach(fitler => {
                        fitler.isActive = d.id === fitler.id ? true : false;
                    });

                    d3.select("#filters_screen .filter")
                        .classed("active", fitler => fitler.id === d.id ? true : false);
                    
                    updateHistogram(data.id, data);
                }

            }
    )

};

const updateHistogram = (filterId, data) => {

    const updateData = filteredId === "all"
    ? data
    : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.select("#histogram rect")
        .data(updatedBins)
        .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerheight - yScale(d.length));
}