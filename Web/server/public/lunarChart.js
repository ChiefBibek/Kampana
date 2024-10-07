// Chart dimensions
const lunarWidth = 1920;
const lunarHeight = 500;
const lunarMarginTop = 20;
const lunarMarginRight = 40;
const lunarMarginBottom = 30;
const lunarMarginLeft = 40;

function updateLunarChart() {
  const startDate = document.getElementById('lunarStartDate').value;
  const endDate = document.getElementById('lunarEndDate').value;

  if (new Date(startDate) > new Date(endDate)) {
    alert('Start date cannot be after the end date');
    return;
  }

  const startTime = `${startDate}T00:00:00.000Z`;
  const endTime = `${endDate}T23:59:59.999Z`;

  // Clear existing chart
  document.getElementById("lunarChart").innerHTML = "";

  fetch("http://localhost:3000/api/quake/lunar/getDataByTimeRange", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start: startTime,
      end: endTime,
    }),
  })
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    console.log("Lunar data:", data);
    renderLunarSeismograph(data);
  })
  .catch(error => console.error("Error fetching Lunar data:", error));
}

function renderLunarSeismograph(data) {
  // Create the scales
  const x = d3.scaleUtc()
    .domain(d3.extent(data, d => new Date(d.time_abs)))
    .rangeRound([lunarMarginLeft, lunarWidth - lunarMarginRight]);

  const yExtent = d3.extent(data, d => d.velocity);
  const yAmplitude = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));

  const y = d3.scaleLinear()
    .domain([-yAmplitude, yAmplitude])
    .rangeRound([lunarHeight - lunarMarginBottom, lunarMarginTop]);

  // Create the SVG container
  const svg = d3.select("#lunarChart")
    .append("svg")
    .attr("width", lunarWidth)
    .attr("height", lunarHeight)
    .attr("viewBox", [0, 0, lunarWidth, lunarHeight])
    .attr("style", "max-width: 100%; height: auto; background-color: #f5f5dc;");

  // Add grid lines
  const gridLines = svg.append("g").attr("class", "grid-lines");

  gridLines.selectAll("line.vertical")
    .data(d3.range(lunarMarginLeft, lunarWidth - lunarMarginRight, 30))
    .join("line")
    .attr("class", "vertical")
    .attr("x1", d => d)
    .attr("x2", d => d)
    .attr("y1", lunarMarginTop)
    .attr("y2", lunarHeight - lunarMarginBottom)
    .attr("stroke", "#ddd")
    .attr("stroke-width", 0.5);

  gridLines.selectAll("line.horizontal")
    .data(d3.range(lunarMarginTop, lunarHeight - lunarMarginBottom, 30))
    .join("line")
    .attr("class", "horizontal")
    .attr("x1", lunarMarginLeft)
    .attr("x2", lunarWidth - lunarMarginRight)
    .attr("y1", d => d)
    .attr("y2", d => d)
    .attr("stroke", "#ddd")
    .attr("stroke-width", 0.5);

  // Create the seismograph line
  const line = d3.line()
    .curve(d3.curveLinear)
    .x(d => x(new Date(d.time_abs)))
    .y(d => y(d.velocity));

  // Create color gradient
  const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "lunar-line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0).attr("y1", y(-yAmplitude))
    .attr("x2", 0).attr("y2", y(yAmplitude));

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "blue");

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "darkblue");

  // Add the seismograph line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "url(#lunar-line-gradient)")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // Add axes
  const xAxis = svg.append("g")
    .attr("transform", `translate(0,${lunarHeight - lunarMarginBottom})`)
    .call(d3.axisBottom(x).ticks(lunarWidth / 160).tickSizeOuter(0));

  const yAxis = svg.append("g")
    .attr("transform", `translate(${lunarMarginLeft},0)`)
    .call(d3.axisLeft(y).ticks(10));

  // Style axes
  [xAxis, yAxis].forEach(axis => {
    axis.select(".domain").attr("stroke", "#999");
    axis.selectAll(".tick line").attr("stroke", "#999");
    axis.selectAll(".tick text").attr("fill", "#666");
  });

  // Add center line
  svg.append("line")
    .attr("x1", lunarMarginLeft)
    .attr("x2", lunarWidth - lunarMarginRight)
    .attr("y1", y(0))
    .attr("y2", y(0))
    .attr("stroke", "#999")
    .attr("stroke-dasharray", "4,4");
}