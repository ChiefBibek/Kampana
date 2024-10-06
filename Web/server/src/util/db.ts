import mongoose from "mongoose";

// Function to connect to the MongoDB database using mongoose
const connectDB = async (): Promise<void> => {
    
    // const mongoUri = process.env.MONGO_URI;
    if (!process.env.MONGO_URI) {
        console.error("Error!! : MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        // Attempt to establish a connection to the MongoDB database
        const con = await mongoose.connect(process.env.MONGO_URI as string);

        // Log the host name of the MongoDB server on successful connection
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } 
    catch (error: unknown) {
        // Log the error message in case the connection fails
        if (error instanceof Error) {
            console.log("Error!! : " + error.message);
        }

        // Exit the process with failure code (1) on connection failure
        process.exit(1);
    }
}

// Export the connectDB function for use in other parts of the application
export { connectDB };
