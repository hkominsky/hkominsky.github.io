// Set up SVG dimensions
const width = 800;
const height = 500;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);

const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

const chart = svg.append("g")
  .attr("transform", `translate(${margin.left + 30}, ${margin.top})`);

// Load CSV data
d3.csv("food_rating_dataset(new).csv").then(data => {
  // Parse the data
  data.forEach(d => {
    d.foodRatings = +d["Food Ratings"]; // Convert Food Ratings to number
    d.tuitionChange5Years = +d["Change in Tuition Fee (5 Years)"]; // Convert Change in Tuition Fee to number
  });

  // Scales
  const x = d3.scaleLinear()
    .domain([d3.min(data, d => d.foodRatings) - 0.5, d3.max(data, d => d.foodRatings) + 0.5])
    .range([0, chartWidth]);

  const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.tuitionChange5Years) - 500, d3.max(data, d => d.tuitionChange5Years) + 500])
    .range([chartHeight, 0]);

  // Axes
  chart.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(x).ticks(5));

  chart.append("g")
    .call(d3.axisLeft(y).ticks(5));

  // Points
  chart.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.foodRatings))
    .attr("cy", d => y(d.tuitionChange5Years))
    .attr("r", 5);

  // Labels
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Food Ratings");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Change in Tuition Fee (5 Years)");
}).catch(error => {
  console.error("Error loading CSV data:", error);
});
