// marsChart.js (for marsChart.js, replace 'mars' with 'mars' in the API endpoint)

// Define chart dimensions
const width = 1920;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

function initmarsChart() {
    // Initialize the chart (if needed)
    // This could be empty if no initialization is required
}

function updatemarsChart() {
    const startYear = document.getElementById("startYear").value;
    const endYear = document.getElementById("endYear").value;

    const startTime = `${startYear}-01-01T00:00:00.000Z`;
    const endTime = `${endYear}-12-31T23:59:59.999Z`;

    // Clear existing chart
    document.getElementById("marsChart").innerHTML = "";

    fetch("http://localhost:3000/api/quake/mars/getDataByTimeRange", {
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
        renderSeismograph(data, "marsChart");
    })
    .catch(error => console.error("Error fetching mars data:", error));
}

function renderSeismograph(data, elementId) {
    // Create the scales
    const x = d3.scaleUtc()
        .domain(d3.extent(data, d => new Date(d.time_abs)))
        .rangeRound([marginLeft, width - marginRight]);

    // Adjust y scale for seismograph effect
    const yExtent = d3.extent(data, d => d.time_rel);
    const yAmplitude = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));

    const y = d3.scaleLinear()
        .domain([-yAmplitude, yAmplitude])
        .rangeRound([height - marginBottom, marginTop]);

    // Create the SVG container with a beige background
    const svg = d3.select(`#${elementId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; background-color: #f5f5dc;");

    // Create background grid lines
    const gridLines = svg.append("g").attr("class", "grid-lines");

    // Vertical grid lines
    gridLines.selectAll("line.vertical")
        .data(d3.range(marginLeft, width - marginRight, 30))
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
        .attr("x2", width - marginRight)
        .attr("y1", d => d)
        .attr("y2", d => d)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 0.5);

    // Create the seismograph line
    const line = d3.line()
        .curve(d3.curveLinear)
        .x(d => x(new Date(d.time_abs)))
        .y(d => y(d.time_rel));

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
            .ticks(width / 160)
            .tickSizeOuter(0));

    // Add measurement lines (left and right)
    const yAxisLeft = svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(10));

    const yAxisRight = svg.append("g")
        .attr("transform", `translate(${width - marginRight},0)`)
        .call(d3.axisRight(y).ticks(10));

    // Style axes
    [xAxis, yAxisLeft, yAxisRight].forEach(axis => {
        axis.select(".domain").attr("stroke", "#999");
        axis.selectAll(".tick line").attr("stroke", "#999");
        axis.selectAll(".tick text").attr("fill", "#666");
    });

    // Add a center line
    svg.append("line")
        .attr("x1", marginLeft)
        .attr("x2", width - marginRight)
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("stroke", "#999")
        .attr("stroke-dasharray", "4,4");
}

