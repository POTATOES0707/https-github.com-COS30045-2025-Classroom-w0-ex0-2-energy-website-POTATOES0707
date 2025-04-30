
const margin = {top: 40, right: 30, bottom:50, left: 70};
const width = 800;
const height = 400;
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

const binGenerator = d3.bin()
.value(d => d.energyConsumption);

const bins = binGenerator(data); //save the bins into an array

console.log(bins); //Log the bins to the console for debugging

const minEng = bins[0].x0; //Get the minimum energy consumption value from the first bin    
const maxEng = bins[bins.length - 1].x1; //Get the maximum
const binsMaxLength = d3.max(bins, d => d.length); //Get the maximum length of the bins

const xScale = d3.scaleLinear()
.domain([minEng, maxEng])
.range([0, innerwidth]);
const yScale = d3.scaleLinear()
.domain([0, binsMaxLength])
.range([innerheight, 0])
.nice();

