// Chart dimensions
const lunarWidth = 1920;
const lunarHeight = 500;
const lunarMarginTop = 20;
const lunarMarginRight = 40;
const lunarMarginBottom = 50; // Increased for better spacing
const lunarMarginLeft = 80; // Increased for velocity values

function renderLunarSeismograph(data) {
  // Find the actual min and max of the velocity data
  const yExtent = d3.extent(data, d => d.velocity);
  const yAmplitude = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));
  
  // Create the scales
  const x = d3.scaleUtc()
    .domain(d3.extent(data, d => new Date(d.time_abs)))
    .rangeRound([lunarMarginLeft, lunarWidth - lunarMarginRight]);

  const y = d3.scaleLinear()
    .domain([-1000, 1000]) // Fixed range for better visibility
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

  // Vertical grid lines (time-based)
  const xTicks = x.ticks(d3.timeMonth.every(3)); // Show every 3 months
  gridLines.selectAll("line.vertical")
    .data(xTicks)
    .join("line")
    .attr("class", "vertical")
    .attr("x1", d => x(d))
    .attr("x2", d => x(d))
    .attr("y1", lunarMarginTop)
    .attr("y2", lunarHeight - lunarMarginBottom)
    .attr("stroke", "#ddd")
    .attr("stroke-width", 0.5);

  // Horizontal grid lines (velocity-based)
  const yTicks = y.ticks(10);
  gridLines.selectAll("line.horizontal")
    .data(yTicks)
    .join("line")
    .attr("class", "horizontal")
    .attr("x1", lunarMarginLeft)
    .attr("x2", lunarWidth - lunarMarginRight)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#ddd")
    .attr("stroke-width", 0.5);

  // Create the seismograph line
  const line = d3.line()
    .curve(d3.curveLinear)
    .x(d => x(new Date(d.time_abs)))
    .y(d => y(d.velocity));

  // Add the seismograph line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // Add axes
  const xAxis = svg.append("g")
    .attr("transform", `translate(0,${lunarHeight - lunarMarginBottom})`)
    .call(d3.axisBottom(x)
      .ticks(d3.timeMonth.every(3))
      .tickFormat(d3.timeFormat("%b %Y"))); // Format as "Jan 1971"

  const yAxis = svg.append("g")
    .attr("transform", `translate(${lunarMarginLeft},0)`)
    .call(d3.axisLeft(y)
      .ticks(10)
      .tickFormat(d => d.toFixed(0))); // Remove decimal places

  // Style axes
  [xAxis, yAxis].forEach(axis => {
    axis.select(".domain").attr("stroke", "#999");
    axis.selectAll(".tick line").attr("stroke", "#999");
    axis.selectAll(".tick text")
      .attr("fill", "#666")
      .style("font-size", "12px");
  });

  // Add center line
  svg.append("line")
    .attr("x1", lunarMarginLeft)
    .attr("x2", lunarWidth - lunarMarginRight)
    .attr("y1", y(0))
    .attr("y2", y(0))
    .attr("stroke", "#999")
    .attr("stroke-dasharray", "4,4");

  // Add axis labels
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", lunarMarginLeft - 60)
    .attr("x", 0 - (lunarHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Velocity");
    
  svg.append("text")
    .attr("transform", `translate(${lunarWidth/2}, ${lunarHeight - 10})`)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Time");
}

function updateLunarChart() {
  const chartDiv = document.getElementById("lunarChart");
  const startDate = document.getElementById('lunarStartDate').value;
  const endDate = document.getElementById('lunarEndDate').value;

  if (!startDate || !endDate) {
    chartDiv.innerHTML = "Please select both start and end dates.";
    return;
  }

  chartDiv.innerHTML = "<div class='loading'>Loading lunar seismic data...</div>";

  const startTime = formatDateForAPI(startDate);
  const endTime = formatDateForAPI(endDate, true);

  // For testing, generate sample data
  const sampleData = generateSampleData(startTime, endTime);
  chartDiv.innerHTML = "";
  renderLunarSeismograph(sampleData);
}

function generateSampleData(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const days = (end - start) / (1000 * 60 * 60 * 24);
  
  return Array.from({length: days}, (_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    return {
      time_abs: date.toISOString(),
      velocity: Math.sin(i / 10) * 500 + (Math.random() - 0.5) * 200
    };
  });
}

function formatDateForAPI(date, isEndDate = false) {
  const d = new Date(date);
  d.setUTCHours(isEndDate ? 23 : 0);
  d.setUTCMinutes(isEndDate ? 59 : 0);
  d.setUTCSeconds(isEndDate ? 59 : 0);
  d.setUTCMilliseconds(isEndDate ? 999 : 0);
  return d.toISOString();
}