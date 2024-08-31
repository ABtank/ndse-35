import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get("/me", (req: Request, res: Response) => {
    res.render('user/me', {
        title: "Профиль"
    })
});


export default router;