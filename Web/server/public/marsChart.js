function renderMarsSeismograph(data) {
    // Create the scales
    const x = d3.scaleUtc()
        .domain(d3.extent(data, d => new Date(d.time_abs)))
        .rangeRound([chartWidth + marginLeft, totalWidth - marginRight]);

    // Use velocity for y-axis
    const yExtent = d3.extent(data, d => d.velocity);
    const yAmplitude = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));

    const y = d3.scaleLinear()
        .domain([-yAmplitude, yAmplitude])
        .rangeRound([height - marginBottom, marginTop]);

    // Create the color scale based on velocity values
    const colorScale = d3.scaleSequential(d3.interpolateCool)
        .domain([-yAmplitude, yAmplitude]);

    // Create the SVG container
    const svg = d3.select("#marsChart")
        .append("svg")
        .attr("width", chartWidth)
        .attr("height", height)
        .attr("viewBox", [chartWidth, 0, chartWidth, height])
        .attr("style", "max-width: 100%; height: auto; background-color: #f5f5dc;");

    // Create background grid lines
    const gridLines = svg.append("g").attr("class", "grid-lines");

    // Vertical grid lines
    gridLines.selectAll("line.vertical")
        .data(d3.range(chartWidth + marginLeft, totalWidth - marginRight, 30))
        .join("line")
        .attr("class", "vertical")
        .attr("x1", d => d - chartWidth)
        .attr("x2", d => d - chartWidth)
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

    // Create the seismograph line with color interpolation
    const line = d3.line()
        .curve(d3.curveLinear)
        .x(d => x(new Date(d.time_abs)) - chartWidth)
        .y(d => y(d.velocity));

    // Add the seismograph line
    svg.append("g")
        .selectAll("path")
        .data([data])
        .join("path")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("stroke", d => {
            // Use velocity data to assign a color from the colorScale
            return d3.scaleLinear()
                .domain([0, data.length])
                .range([d3.interpolateCool(0), d3.interpolateCool(1)])(d.velocity);
        });

    // Add time axis (bottom)
    const xAxis = svg.append("g")
        .attr("transform", `translate(${-chartWidth},${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(chartWidth / 160)
            .tickSizeOuter(0));

    // Add velocity axis
    const yAxis = svg.append("g")
        .attr("transform", `translate(${chartWidth - marginRight},0)`)
        .call(d3.axisRight(y).ticks(10));

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
        .text("Mars Seismograph");
}
