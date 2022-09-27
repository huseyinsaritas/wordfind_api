import http from "http";
import express from "express";
import cors from "cors";
import gameRoutes from "./api/routes/gameRoutes";
import validationRoutes from "./api/routes/validationRoutes";

const LISTEN_PORT = 8000;
const app = express(); // to support JSON-encoded bodies
app.use(express.json()); // to support JSON-encoded bodies
app.use(cors({ origin: true, credentials: true }));

const server = http.createServer(app);

app.get("/", async (req, res, next) => res.send("hello from wordfind_api"));

app.use("/game", gameRoutes);
app.use("/isValid", validationRoutes);

const main = () => {
  console.log("app started.");

  server.listen(LISTEN_PORT, () => {
    console.log("wordfind_api service started on *:" + LISTEN_PORT);
  });
};

main();
