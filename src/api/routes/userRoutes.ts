import { Router } from "express";
import { userController } from "../controllers/userController";

const userRoutes = Router();

userRoutes.route("/:deviceId").get(userController.get);
userRoutes.route("/:deviceId").post(userController.post);

export default userRoutes;
