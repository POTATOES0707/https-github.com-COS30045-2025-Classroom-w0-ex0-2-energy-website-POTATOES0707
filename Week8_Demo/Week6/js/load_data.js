d3.csv("data/Ex6_TVdata.csv", d => {
    return {
      brand: d.brand,
      model: d.model,
      screenSize: +d.screenSize,
      screenTech: d.screenTech,
      energyConsumption: +d.energyConsumption,
      star: +d.star,
    };
  }).then(data => {
      console.log(data);
  
      drawHistogram(data);
      drawScatterplot(data);
      populateFilters(data); 

      createTooltip();
      handleMouseEvents();
  }); 