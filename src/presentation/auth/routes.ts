import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const authRepository = new AuthRepositoryImpl(new AuthDataSourceImpl());
        const controller = new AuthController(authRepository);

        // Define your routes here
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
        router.get('/', [AuthMiddleware.validateToken], controller.getUser);

        return router;
    }
}
