// Chart dimensions
const marsWidth = 1920;
const marsHeight = 500;
const marsMarginTop = 20;
const marsMarginRight = 40;
const marsMarginBottom = 30;
const marsMarginLeft = 40;

function updateMarsChart() {
  const startDate = document.getElementById("marsStartDate").value;
  const endDate = document.getElementById("marsEndDate").value;

  if (new Date(startDate) > new Date(endDate)) {
    alert("Start date cannot be after the end date");
    return;
  }

  // Clear existing chart
  document.getElementById("lunarChart").innerHTML = "";

  // Helper function to format date to ISO string with specific time
  function formatDateForAPI(date, isEndDate = false) {
    const d = new Date(date);
    d.setUTCHours(isEndDate ? 23 : 0);
    d.setUTCMinutes(isEndDate ? 59 : 0);
    d.setUTCSeconds(isEndDate ? 59 : 0);
    d.setUTCMilliseconds(isEndDate ? 999 : 0);
    return d.toISOString();
  }

  // Format dates for API request
  const startTime = formatDateForAPI(startDate);
  const endTime = formatDateForAPI(endDate, true);

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
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log("Mars data:", data);

      if (!data || data.length === 0) {
        chartDiv.innerHTML =
          "No seismic data available for the selected time range.";
        return;
      }

      chartDiv.innerHTML = ""; // Clear loading message
      renderMarsSeismograph(data);
    })
    .catch((error) => {
      console.error("Error fetching Mars data:", error);
      chartDiv.innerHTML = `Error loading data: ${error.message}`;
    });
}

function renderMarsSeismograph(data) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid or empty data received");
    return;
  }

  // Check data structure
  if (!data[0].time_abs || !data[0].velocity) {
    console.error(
      "Data missing required properties. Sample data point:",
      data[0]
    );
    return;
  }

  // Create the scales
  const x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => new Date(d.time_abs)))
    .rangeRound([marsMarginLeft, marsWidth - marsMarginRight]);

  const yExtent = d3.extent(data, (d) => d.velocity);
  const yAmplitude = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));

  const y = d3
    .scaleLinear()
    .domain([-yAmplitude, yAmplitude])
    .rangeRound([marsHeight - marsMarginBottom, marsMarginTop]);

}
