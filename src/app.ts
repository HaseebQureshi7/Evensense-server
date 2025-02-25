import express, {json, urlencoded} from "express";
import cors, { CorsOptions } from "cors";
import { config } from "dotenv";
import appRouter from "./presentation/routes/index.routes";
import { globalErrorHandler } from "./shared/utils/GlobalErrorHandler";
import helmet from "helmet";
config();

const app = express();

// middlewares
const corsOptions: CorsOptions = {
    origin: "*"
}
// For XSS / Clickjacking
app.use(helmet())

app.use(cors(corsOptions));
app.use(json({limit: "10mb"}));
app.use(urlencoded({limit: "10mb", extended: false}));

// router
app.use(appRouter)

// error handler
app.use(globalErrorHandler)

export default app