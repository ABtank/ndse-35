import * as express from 'express';

const router = express.Router();

const errors: { code: string; title: string; descr: string }[] = [
  { code: '404', title: 'страница не найдена', descr: 'Что-то пошло не так, попробуйте еще раз.' },
];

router.get('/:code', (req: any, res: any) => {
  const errorCode = req.params.code;
  const error = errors.find(el => el.code === errorCode) || errors[0];

  res.render('errors/error', {
    title: "Главная",
    error: error,
  });
});

export default router;
