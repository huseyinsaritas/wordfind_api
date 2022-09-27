import http from "http";
import express from "express";
import cors from "cors";
import gameRoutes from "./api/routes/gameRoutes";

const LISTEN_PORT = 90;
const app = express(); // to support JSON-encoded bodies
app.use(express.json()); // to support JSON-encoded bodies
app.use(cors());

const server = http.createServer(app);

app.get("/", async (req, res, next) => res.send("hello from wordfind_api"));

app.use("/game", gameRoutes);

const main = () => {
  console.log("app started.");

  server.listen(LISTEN_PORT, () => {
    console.log("wordfind_api service started on *:" + LISTEN_PORT);
  });
};

main();
