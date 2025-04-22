import app from "./app";
import { connectDB } from "./config/db";
connectDB().then(() => {
  console.log("✅ DB connected");
  app.listen(process.env.PORT, () => {
    console.log("✅ Server is running at port: " + process.env.PORT);
  });
});
