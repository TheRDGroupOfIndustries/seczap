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
    // await updateUsersIntegrationsAndSubscription();
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;

// const updateUsersIntegrationsAndSubscription = async () => {
//   try {
//     await connect();

//     const result = await mongoose.connection.db.collection("Users").updateMany(
//       {
//         $or: [
//           { integrationsAuth: { $ne: ["google", "github", "jira", "slack"] } },
//           { subscription: { $exists: false } }, // Find users who do not have a subscription field
//         ],
//       },
//       {
//         $set: {
//           integrationsAuth: ["email-password"], // Ensure "email-password" is set for existing users
//           subscription: "free", // Set the default subscription to "free"
//         },
//         $addToSet: {
//           integrationsAuth: { $each: ["google", "github", "jira", "slack"] }, // Add new integrations if not present
//         },
//       }
//     );

//     console.log(`${result.matchedCount} documents matched.`);
//     console.log(`${result.modifiedCount} documents were updated.`);
//   } catch (error) {
//     console.error("Error updating users: ", error);
//   }
// };
