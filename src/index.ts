import app from "./app";
import { connectDB } from "./config/db";
connectDB().then(() => {
  console.log("\x1b[32m✅ DB connected" + "\x1b[0m");
  app.listen(process.env.PORT, () => {
    console.log("\x1b[32m✅ Server is running at port: " + process.env.PORT + "\x1b[0m");
  });
});
