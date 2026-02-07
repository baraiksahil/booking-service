import express from "express";
import ServerConfig from "./config/index.js";

const app = express();

ServerConfig.DbConfig.connectToDb();

app.listen(ServerConfig.PORT, function exec() {
  console.log(`Server running on PORT: ${ServerConfig.PORT}`);
});
