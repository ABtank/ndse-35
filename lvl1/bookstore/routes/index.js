const express = require('express')

const router = express.Router()

let urls_api = [
    { method: 'POST', url: '/api/user/login', do: 'авторизация пользователя', descr: 'метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }' },
    { method: 'GET', url: '/api/books', do: 'получить все книги', descr: 'получаем массив всех книг' },
    { method: 'GET', url: '/api/books/:id', do: 'получить книгу по ID', descr: 'получаем объект книги, если запись не найдена, вернём Code: 404' },
    { method: 'GET', url: '/api/books/:id/download', do: 'получить файл книги по ID', descr: 'Метод отдаёт на скачиваение файл книги по её :id' },
    { method: 'POST', url: '/api/books', do: 'создать книгу', descr: 'создаём книгу и возвращаем её же вместе с присвоенным ID' },
    { method: 'POST', url: '/api/books/:id/file', do: 'загрузить файл книги', descr: 'загружаем файл книги по id и возвращаем ссылку на нее' },
    { method: 'PUT', url: '/api/books/:id', do: 'редактировать книгу по ID', descr: 'редактируем объект книги, если запись не найдена, вернём Code: 404' },
    { method: 'DELETE', url: '/api/books/:id', do: 'удалить книгу по ID', descr: 'удаляем книгу и возвращаем ответ: \'ok\'' },
];

const getAllUrls = () => {
    let tableRows = urls_api.map((el, index) => {
        return (`
          <tr>
            <th>${++index}</th>
            <th>${el.method}</th>
            <td>
            <a class="btn btn-sm btn-primary" href="${el.url}">${el.url}</a>
            </td>
            <th>${el.do}</th>
            <th>${el.descr}</th>
          </tr>
         `)
    }).join('');

    return (`
      <table class="table table-striped table-sm  mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th>Метод</th>
            <th>URL</th>
            <th>действие</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `)
};

const layoutStart = (`
  <link
    rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
    crossorigin="anonymous"
  />
    <div class="container pt-5">
`);

const layoutEnd = `</div>`;





router.get('/', (req, res) => {
    const { url } = req
    res.set('Content-Type', 'text/html');
    res.write(layoutStart);
    res.write(`<h2>Main</h2>`);
    res.write(getAllUrls());
    res.write(layoutEnd);
    res.end()
})

module.exports = router