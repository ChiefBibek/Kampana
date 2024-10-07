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
Object.defineProperty(exports, "__esModule", { value: true });
exports.endTime = exports.startTime = void 0;
const chart_1 = require("./component/chart");
exports.startTime = "1971-01-01T00:00:00.000Z";
exports.endTime = "1971-12-31T23:59:59.999Z";
function initializeChart() {
  return __awaiter(this, void 0, void 0, function* () {
    console.log("Initializing chart...");
    try {
      console.log(
        "Fetching data for time range:",
        exports.startTime,
        "to",
        exports.endTime
      );
      const data = yield (0, chart_1.fetchQuakeData)(
        exports.startTime,
        exports.endTime
      );
      console.log("Received data:", data);
      if (data && data.length > 0) {
        console.log("Creating chart with", data.length, "data points");
        yield (0, chart_1.createQuakeChart)(data);
      } else {
        console.warn("No data received from the server");
        const container = document.getElementById("chart-container");
        if (container) {
          container.innerHTML = `<p class="error">No data available for the selected time range.</p>`;
        }
      }
    } catch (error) {
      console.error("Failed to initialize chart:", error);
      const container = document.getElementById("chart-container");
      if (container) {
        container.innerHTML = `<p class="error">Failed to load chart: ${error.message}</p>`;
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing chart...");
  initializeChart();
});
