import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfuly");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default {
  connectToDb,
};
