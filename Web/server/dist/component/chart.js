"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQuakeData = fetchQuakeData;
exports.createQuakeChart = createQuakeChart;
const d3_1 = __importDefault(require("d3"));
const __1 = require("..");
// Function to fetch quake data from the backend
function fetchQuakeData(start, end) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      console.log("Attempting to fetch data...");
      const response = yield fetch("/api/quake/getDataByTimeRange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end }),
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = yield response.json();
      console.log("Received data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching quake data:", error);
      throw error;
    }
  });
}
function createQuakeChart(data) {
  return __awaiter(this, void 0, void 0, function* () {
    // Clear existing chart if any
    const container = document.getElementById("chart-container");
    if (container) {
      container.innerHTML = "";
    } else {
      console.error("Container element not found");
    }
    // Define dimensions and margins
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 60;
    const marginBottom = 40;
    const marginLeft = 60;
    // Process the data
    const processedData = data.map((d) => ({
      time_abs: new Date(d.time_abs),
      time_rel: d.time_rel,
    }));
    // Create the scales
    const x = d3_1.default
      .scaleUtc()
      .domain(d3_1.default.extent(processedData, (d) => d.time_abs)) // Cast to [Date, Date]
      .range([marginLeft, width - marginRight]);
    const y = d3_1.default
      .scaleLinear()
      .domain(d3_1.default.extent(processedData, (d) => d.time_rel)) // Cast to [number, number]
      .nice()
      .range([height - marginBottom, marginTop]);
    // Create the line generator
    const line = d3_1.default
      .line()
      .x((d) => x(d.time_abs))
      .y((d) => y(d.time_rel));
    // Create the SVG container
    const svg = d3_1.default
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");
    // Add the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3_1.default.axisBottom(x).ticks(width / 80))
      .call((g) =>
        g
          .append("text")
          .attr("x", width - marginRight)
          .attr("y", -4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Absolute Time →")
      );
    // Add the y-axis
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3_1.default.axisLeft(y))
      .call((g) =>
        g
          .append("text")
          .attr("x", 4)
          .attr("y", marginTop)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Relative Time (seconds)")
      );
    // Add the line path
    svg
      .append("path")
      .datum(processedData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
    // Optional: Add dots for each data point
    svg
      .append("g")
      .selectAll("circle")
      .data(processedData)
      .join("circle")
      .attr("cx", (d) => x(d.time_abs))
      .attr("cy", (d) => y(d.time_rel))
      .attr("r", 3)
      .attr("fill", "steelblue");
    // Append the SVG to the body or a specific container
    const svgNode = svg.node(); // Get the SVG node
    if (svgNode) {
      document.body.append(svgNode); // Append only if svgNode is not null
    }
  });
}
// Fetch data and create the chart with specified time range
// const startTime = "1971-01-01T00:00:00.000Z"; // Example starting time
// const endTime = "1971-12-31T23:59:59.999Z"; // Example ending time
fetchQuakeData(__1.startTime, __1.endTime);
