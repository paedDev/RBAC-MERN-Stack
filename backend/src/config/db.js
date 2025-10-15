import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb is connected`);
  } catch (error) {
    console.error(`MongoDb connection error`, error);
    process.exit(1);
  }
};
