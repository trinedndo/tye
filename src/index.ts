import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import db from "./config/db.config";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./router";
import cors from "cors";
import path from "path";

db.sync().then(() => {
  console.log("db connected!");
});

const PORT = process.env.PORT || 8000;
const app = express();

const origins = process.env.CLIENT_URLS;
const json = origins ? JSON.parse(origins) : ["*"];
const corsOpt = {
  origin: json,
  credentials: true,
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "static")));
app.use(cookieParser());
app.use(fileUpload({}));
app.use("", router);

app.listen(PORT, () => {
  console.log("server started on port: " + PORT);
});
