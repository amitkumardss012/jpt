import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import ENV from "./config/env.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import connectDB from "./config/db.js";
import { AdminRoute, EnquiryRoute } from "./routes/index.js";

import path from "path";
import { fileURLToPath } from "url";


// 🚀 Initialize express application
const app = express();

connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 🛡️ Security and utility middlewares
app.use(express.json({limit: "20mb"}));
app.use(express.static(path.join(__dirname, "dist")));
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, //⌛ 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      status: 429,
      message: "Too many requests, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
);


// 🩺 Health check endpoint
// app.get("/", (_, res) => {
//     res.json({
//       message: "Server is up and running"
//     });
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/enquiry", EnquiryRoute);

  
// ⚠️ Global error handling middleware
app.use(errorMiddleware);


app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});