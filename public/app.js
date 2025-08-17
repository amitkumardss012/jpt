import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import ENV from "./config/env.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
// 🚀 Initialize express application
const app = express();
// 🛡️ Security and utility middlewares
app.use(express.json({ limit: "20mb" }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, //⌛ 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
}));
// 🩺 Health check endpoint
app.get("/", (_, res) => {
    res.json({
        message: "Server is up and running",
        data: ENV.USER_EMAIL
    });
});
// app.use("/api/v1/admin", adminRouter);
// ⚠️ Global error handling middleware
app.use(errorMiddleware);
// 📤 Export the configured app
export default app;
//# sourceMappingURL=app.js.map