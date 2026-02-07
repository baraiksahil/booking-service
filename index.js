import express from "express";
import { ServerConfig, DbConfig } from "./config/index.js";
import apiRouter from "./router/index.js";

const app = express();

DbConfig.connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(ServerConfig.PORT, function exec() {
  console.log(`Server running on PORT: ${ServerConfig.PORT}`);
});
