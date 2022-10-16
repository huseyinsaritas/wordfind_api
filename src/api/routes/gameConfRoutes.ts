import { Router } from "express";
import { gameConfController } from "../controllers/gameConfController";

const gameConfRoutes = Router();

gameConfRoutes.route("/").get(gameConfController.get);

export default gameConfRoutes;
