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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Function to connect to the MongoDB database using mongoose
const connectDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const mongoUri = process.env.MONGO_URI;
    if (!process.env.MONGO_URI) {
      console.error(
        "Error!! : MONGO_URI is not defined in environment variables."
      );
      process.exit(1);
    }
    try {
      // Attempt to establish a connection to the MongoDB database
      const con = yield mongoose_1.default.connect(process.env.MONGO_URI);
      // Log the host name of the MongoDB server on successful connection
      console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
      // Log the error message in case the connection fails
      if (error instanceof Error) {
        console.log("Error!! : " + error.message);
      }
      // Exit the process with failure code (1) on connection failure
      process.exit(1);
    }
  });
exports.connectDB = connectDB;
