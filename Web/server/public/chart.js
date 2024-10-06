// Define your conditions map
const conditions = new Map([
  ["CLR", { label: "Clear", color: "deepskyblue" }],
  ["FEW", { label: "Few clouds", color: "lightskyblue" }],
  ["SCT", { label: "Scattered clouds", color: "lightblue" }],
  ["BKN", { label: "Broken clouds", color: "#aaaaaa" }],
  ["OVC", { label: "Overcast", color: "#666666" }],
]);

// Example start and end times for fetching data
const startTime = "1970-01-19T00:00:00.000Z"; // Start time in ISO format
const endTime = "1972-01-23T23:59:59.999Z"; // End time in ISO format

fetch("http://localhost:3000/api/quake/getDataByTimeRange", {
  method: "POST", // Use POST method to send body data
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    start: startTime, // Pass start and end time in the request body
    end: endTime,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
})
.then((data) => {
    // Call the function to render the chart with the received data
    console.log(data);
    renderChart(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

function renderChart(data) {

  const width = 1920;
  const height = 500;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Create the scales
  const x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => new Date(d.time_abs))) // Use time_abs for x-axis (date)
    .rangeRound([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.time_rel))
    .nice() // Use time_rel for y-axis
    .rangeRound([height - marginBottom, marginTop]);

  const color = d3
    .scaleOrdinal(
      conditions.keys(),
      Array.from(conditions.values(), (d) => d.color)
    )
    .unknown("black");

  // Create the path generator
  const line = d3
    .line()
    .curve(d3.curveStep)
    .x((d) => x(new Date(d.time_abs))) // Use time_abs for x-axis
    .y((d) => y(d.time_rel)); // Use time_rel for y-axis

  // Create the SVG container
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Append the axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    )
    .call((g) => g.select(".domain").remove());

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g.select(".tick:last-of-type text").append("tspan").text(data.y)
    );

  // Create the grid
  svg
    .append("g")
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(x.ticks())
        .join("line")
        .attr("x1", (d) => 0.5 + x(d))
        .attr("x2", (d) => 0.5 + x(d))
        .attr("y1", marginTop)
        .attr("y2", height - marginBottom)
    )
    .call((g) =>
      g
        .append("g")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
        .attr("y1", (d) => 0.5 + y(d))
        .attr("y2", (d) => 0.5 + y(d))
        .attr("x1", marginLeft)
        .attr("x2", width - marginRight)
    );

  // Create the linear gradient
  const colorId = "colorGradient";
  svg
    .append("linearGradient")
    .attr("id", colorId)
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("x2", width)
    .selectAll("stop")
    .data(data)
    .join("stop")
    .attr("offset", (d) => x(new Date(d.time_abs)) / width)
    .attr("stop-color", (d) => color(d.condition));

  // Create the main path
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", `url(#${colorId})`)
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);
}
