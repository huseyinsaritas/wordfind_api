import { Router } from "express";
import { validationController } from "../controllers/validationController";

const validationRoutes = Router();

validationRoutes.route("/:word").get(validationController.getTr);
validationRoutes.route("/:word/:lan").get(validationController.get);

export default validationRoutes;
