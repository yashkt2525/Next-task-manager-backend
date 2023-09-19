import mongoose from "mongoose";

function connection() {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((err) => console.log("error occur while connecting", err));
}
export default connection;
