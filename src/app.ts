import express, {json, urlencoded} from "express";
import cors from "cors";
import { config } from "dotenv";
import appRouter from "./presentation/routes/index.routes";
import { globalErrorHandler } from "./shared/utils/GlobalErrorHandler";
import helmet from "helmet";
import { corsOptions } from "./config/corsOptions.config";
config();

const app = express();

// middlewares
app.use(helmet()) // For XSS / Clickjacking
app.use(cors(corsOptions));
app.use(json({limit: "10mb"}));
app.use(urlencoded({limit: "10mb", extended: false}));

// router
app.use(appRouter)

// error handler
app.use(globalErrorHandler)

export default app