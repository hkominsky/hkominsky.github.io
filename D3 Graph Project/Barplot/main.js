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

  // Adding the title
svg.append("text")
.attr("x", width / 2)
.attr("y", margin.top / 2)
.attr("text-anchor", "middle")
.style("font-size", "16px")
.style("font-weight", "bold")
.text("Food Ratings vs Change in Tuition Fee (5 Years)");

// Create a tooltip
const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "1px solid black")
  .style("padding", "5px")
  .style("border-radius", "5px")
  .style("opacity", 0)
  .style("pointer-events", "none");

// Load CSV data
d3.csv("average_tuition_by_grade.csv").then(data => {
  // Parse the data
  data.forEach(d => {
    d["Change in Tuition Fee (5 Years)"] = +d["Average Change in Tuition Fee (5 Years)"]; // Convert to number
  });

  // Manually adjust the order of grades
  const gradeOrder = ["D", "C", "B", "A", "A+"]; // Specify the desired order

  // Set up scales
  const x = d3.scaleBand()
    .domain(gradeOrder) // Use the custom order
    .range([0, chartWidth])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["Change in Tuition Fee (5 Years)"])])
    .range([chartHeight, 0]);

  // Define a color scale
  const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d["Food Letter Grades"]))
    .range(["#ff5733", "#33ff57", "#3357ff", "#ff33a8", "#ffd700"]); // Custom colors for each bar

  // Axes
  chart.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(x));

  chart.append("g")
    .call(d3.axisLeft(y).ticks(5));

  // Bars
  chart.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d["Food Letter Grades"]))
    .attr("y", d => y(d["Change in Tuition Fee (5 Years)"]))
    .attr("width", x.bandwidth())
    .attr("height", d => chartHeight - y(d["Change in Tuition Fee (5 Years)"]))
    .attr("fill", d => colorScale(d["Food Letter Grades"]))
    .on("mouseover", function (event, d) {
      tooltip
        .style("opacity", 1)
        .html(`Grade: ${d["Food Letter Grades"]}<br>Change: $${d["Change in Tuition Fee (5 Years)"]}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
      d3.select(this).style("opacity", 0.8); // Highlight bar
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
      d3.select(this).style("opacity", 1); // Reset bar opacity
    });

  // Labels
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Food Letter Grades");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Average Change in Tuition Fee (5 Years)");
}).catch(error => {
  console.error("Error loading CSV data:", error);
});
