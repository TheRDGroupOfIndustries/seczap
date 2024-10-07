import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (mongoose.connections[0].readyState) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: "SecZap",
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000, // increasing timeout to 30 seconds
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
