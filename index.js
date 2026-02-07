import express from "express";
import ServerConfig from "./config/server.config.js";

const app = express();

app.listen(ServerConfig.PORT, function exec() {
  console.log(`Server running on PORT: ${ServerConfig.PORT}`);
});
