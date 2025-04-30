
const margin = {top: 40, right: 30, bottom:50, left: 70};
const width = 800;
const height = 400;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

const binGenerator = d3.bin()
.value(d => d.energyConsumption);

const xScale = d3.scaleLinear()
const yScale = d3.scaleLinear()


