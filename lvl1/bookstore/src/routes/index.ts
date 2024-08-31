import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
const urls_api = [
  { method: 'POST', url: '/api/user/login', do: 'авторизация пользователя', descr: 'метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }' },
  { method: 'GET', url: '/api/books', do: 'получить все книги', descr: 'получаем массив всех книг' },
  { method: 'GET', url: '/api/books/:id', do: 'получить книгу по ID', descr: 'получаем объект книги, если запись не найдена, вернём Code: 404' },
  { method: 'GET', url: '/api/books/:id/download', do: 'получить файл книги по ID', descr: 'Метод отдаёт на скачиваение файл книги по её :id' },
  { method: 'POST', url: '/api/books', do: 'создать книгу', descr: 'создаём книгу и возвращаем её же вместе с присвоенным ID' },
  { method: 'POST', url: '/api/books/:id/file', do: 'загрузить файл книги', descr: 'загружаем файл книги по id и возвращаем ссылку на нее' },
  { method: 'PUT', url: '/api/books/:id', do: 'редактировать книгу по ID', descr: 'редактируем объект книги, если запись не найдена, вернём Code: 404' },
  { method: 'DELETE', url: '/api/books/:id', do: 'удалить книгу по ID', descr: 'удаляем книгу и возвращаем ответ: \'ok\'' },
];

const urls_ui = [
  { method: 'GET', url: '/books', do: 'получить все книги', descr: 'получаем массив всех книг' },
  { method: 'GET', url: '/books/create', do: 'получить пустую форму на создание', descr: 'получить пустую форму на создание' },
  { method: 'GET', url: '/books/update/:id', do: 'получить заполненую форму на редактирование', descr: 'получить заполненую форму на редактирование' },
  { method: 'GET', url: '/books/:id', do: 'получить книгу по ID', descr: 'возвращаем карточку книги' },
  { method: 'GET', url: '/books/:id/download', do: 'получить файл книги по ID', descr: 'Метод отдаёт на скачиваение файл книги по её :id' },
  { method: 'POST', url: '/books/create', do: 'создать книгу', descr: 'создаём книгу и возвращаем список книг' },
  { method: 'POST', url: '/books/update/:id', do: 'редактировать книгу', descr: 'отредактировать книгу и возвращаем ее карточку' },
  { method: 'PUT', url: '/books/:id', do: 'редактировать книгу по ID', descr: 'редактируем объект книги, если запись не найдена, вернём Code: 404' },
  { method: 'POST', url: '/books/delete/:id', do: 'удалить книгу по ID', descr: 'удаляем книгу и возвращаем список книг' },
  { method: 'POST', url: '/books/delete/:id/file_book', do: 'удалить файл книги по ID', descr: 'удаляем файл книги по ID и возвращаемся где были' },
];

router.get('/',
  (req: Request, res: Response) => {
    res.render('index', {
      title: "Главная",
      current_nav: 'home'
    })
  })

router.get('/info', (req: Request, res: Response) => {
  res.render('info', {
    title: "Инфо",
    sub_title_1: "API",
    sub_title_2: "UI",
    current_nav: 'info',
    urls_api: urls_api,
    urls_ui: urls_ui,
  })
})

export default router;
