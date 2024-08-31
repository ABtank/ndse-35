import { NextFunction, Router } from 'express';
import * as express  from 'express';
import { container, TYPES } from '../infrastructure/container';
import { AuthController } from '../controllers/authController';
const authController: AuthController = container.get(TYPES.AuthController);

const router: Router = express.Router();

router.post("/logout", (req: any, res: any, next: NextFunction) => authController.logout(req, res, next));
router.post('/signup', (req: any, res: any) => authController.signup(req, res));

router.get("/logout", (req: any, res: any, next: NextFunction) => authController.logout(req, res, next));
router.get('/login', (req: any, res: any) => authController.loginPage(req, res));
router.get("/signup", (req: any, res: any) => authController.signupPage(req, res));

export default router;