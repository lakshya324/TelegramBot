import hpp from "hpp";
import cors from "cors";
import csurf from "csurf";
import morgan from "morgan";
import helmet from "helmet";
import express, { Request } from "express";
import enforce from "express-sslify";
import bodyParser from "body-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";

import router from "./routers";
import {
  ipExpireTime,
  ipRateLimit,
  port,
} from "./config/config.env";
import { connectToDatabase } from "./models/connect";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(hpp());
app.use(helmet());
app.use(compression());
//! Commant below line for LOCALHOST -or- HTTP
app.use(enforce.HTTPS({ trustProtoHeader: true }));
// app.use(csurf());
app.set("trust proxy", true);

//* IP Rate Limiter
app.use(
  rateLimit({
    windowMs: ipExpireTime * 60 * 1000,
    max: ipRateLimit,
    message: `Too many requests from this IP, please try again after ${ipExpireTime} minutes`,
    keyGenerator: (req: Request) => {
      return req.ip || "unknown";
    },
  })
);

app.use(morgan("dev"));

//* Routes
app.use(router);

connectToDatabase()
  .then(async (result) => {
    app.listen(port, () =>
      console.log("\x1b[36m%s\x1b[0m", `Server started on port ${port}`)
    );
  })
  .catch((err) => console.log(err));
