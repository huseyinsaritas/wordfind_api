import { Router } from "express";
import { gameController } from "../controllers/gameController";

const gameRoutes = Router();

gameRoutes.route("/:len").get(gameController.getTr);
gameRoutes.route("/:len/:lan").get(gameController.get);

export default gameRoutes;
