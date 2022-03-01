import { connect } from "mongoose";
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = "mongodb://localhost:27017/htbsrmist",
} = process.env;

console.log(MONGO_URI);

export const connectToDatabase = () => connect(MONGO_URI);
