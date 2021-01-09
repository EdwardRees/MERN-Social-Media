import mongoose from "mongoose";
import config from "config";
const db: string = config.get("mongoDev");

const connectDB = async (): Promise<any> => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.info("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with exit code of 1
    process.exit(1);
  }
};

export { connectDB };
