// lunarChart.js
const totalWidth = 1920;
const chartWidth = totalWidth / 2;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

function initLunarChart() {
    // Initial chart render if needed
}

function updateLunarChart() {
    const startYear = document.getElementById("startYear").value;
    const endYear = document.getElementById("endYear").value;

    const startTime = `${startYear}-01-01T00:00:00.000Z`;
    const endTime = `${endYear}-12-31T23:59:59.999Z`;

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
    .catch(error => console.error("Error fetching lunar data:", error));
}

function renderLunarSeismograph(data) {
    // Create the scales
    const x = d3.scaleUtc()
        .domain(d3.extent(data, d => new Date(d.time_abs)))
        .rangeRound([marginLeft, chartWidth - marginRight]);

    // Use velocity for y-axis
    const yExtent = d3.extent(data, d => d.velocity);
    const yAmplitude = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));

    const y = d3.scaleLinear()
        .domain([-yAmplitude, yAmplitude])
        .rangeRound([height - marginBottom, marginTop]);

    // Create the SVG container
    const svg = d3.select("#lunarChart")
        .append("svg")
        .attr("width", chartWidth)
        .attr("height", height)
        .attr("viewBox", [0, 0, chartWidth, height])
        .attr("style", "max-width: 100%; height: auto; background-color: #f5f5dc;");

    // Create background grid lines
    const gridLines = svg.append("g").attr("class", "grid-lines");

    // Vertical grid lines
    gridLines.selectAll("line.vertical")
        .data(d3.range(marginLeft, chartWidth - marginRight, 30))
        .join("line")
        .attr("class", "vertical")
        .attr("x1", d => d)
        .attr("x2", d => d)
        .attr("y1", marginTop)
        .attr("y2", height - marginBottom)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 0.5);

    // Horizontal grid lines
    gridLines.selectAll("line.horizontal")
        .data(d3.range(marginTop, height - marginBottom, 30))
        .join("line")
        .attr("class", "horizontal")
        .attr("x1", marginLeft)
        .attr("x2", chartWidth - marginRight)
        .attr("y1", d => d)
        .attr("y2", d => d)
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
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("d", line);

    // Add time axis (bottom)
    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(chartWidth / 160)
            .tickSizeOuter(0));

    // Add velocity axis
    const yAxis = svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(10));

    // Style axes
    [xAxis, yAxis].forEach(axis => {
        axis.select(".domain").attr("stroke", "#999");
        axis.selectAll(".tick line").attr("stroke", "#999");
        axis.selectAll(".tick text").attr("fill", "#666");
    });

    // Add a center line
    svg.append("line")
        .attr("x1", marginLeft)
        .attr("x2", chartWidth - marginRight)
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("stroke", "#999")
        .attr("stroke-dasharray", "4,4");

    // Add title
    svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", marginTop)
        .attr("text-anchor", "middle")
        .attr("fill", "#333")
        .style("font-size", "14px")
}