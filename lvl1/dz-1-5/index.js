const http = require('http');
const url = require('url');
const api_weather = require('./api_weather')
api_weather.setAPIKey(process.env.myAPIKey)

let selectСities = [
    { 'id': 'Санкт-Петербург', 'value': 'Санкт-Петербург' },
    { 'id': 'Лондон', 'value': 'Лондон' },
    { 'id': 'Москва', 'value': 'Москва' }
];


const getFormCreateComponent = () => (`
    <form 
      method="POST"
      action="/create"
    >
    <input class="form-control"
      name="id"
      type="text"
      required
      placeholder="название города"
    />
      <button
        class="btn btn-sm btn-success"
        type="submit"
      >
        Найти и добавить
      </button>
    </form>
  `);

const getAllCitiesComponent = (cities = []) => {
    let tableRows = cities.map(({ id, value }, index) => {
        return (`
          <tr>
            <th>${++index}</th>
            <th>${value}</th>
              <td>
                <a class="btn btn-sm btn-primary" href="/current?id=${id}">Узнать погоду</a>
                <a class="btn btn-sm btn-danger" href="/delete?id=${id}">удалить</a>
              </td>
          </tr>
         `)
    }).join('');

    return (`
      <a class="btn btn-primary" href="/create">Добавить запись</a>
      <table class="table table-striped table-sm  mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th>Город</th>
            <th>действие</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `)
};

const getCurrentCityComponent = (cities = []) => {
    let tableRows = cities.map(({ current }, index) => {
        return (`
          <tr>
            <th>${current.temp_c}</th>
            <th>${current.wind_mph}</th>
            <th>${current.pressure_mb}</th>
          </tr>
         `)
    }).join('');

    return (`
      <a class="btn btn-primary" href="/create">Добавить запись</a>
      <table class="table table-striped table-sm  mt-3">
        <thead>
          <tr>
            <th>Темп. (с)</th>
            <th>Ветер(м/с)</th>
            <th>Давление</th>
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
    <style>
    // .container{
    //   background-color: #000;
    // }
    // body{
    //   background-color: #000;
    // }
    </style>
    <div class="container pt-5">
`);

const layoutEnd = `</div>`;

const server = http.createServer(async (req, res) => {

    const urlParsed = url.parse(req.url, true);
    const { pathname, query } = urlParsed;
    const { method } = req;

    res.setHeader('Content-Type', 'text/html; charset=utf-8;');

    if (pathname === '/' || pathname === '/index') {
        res.write(layoutStart);
        res.write(`<h2>Города</h2>`);
        res.write(getAllCitiesComponent(selectСities));
        res.write(layoutEnd);

    } else if (pathname === '/create') {
        if (method === 'GET') {
            res.write(layoutStart);
            res.write(`<h2>Найти и добавить город в список</h2>`);
            res.write(getFormCreateComponent());
            res.write(layoutEnd);

        } else if (method === 'POST') {
            let body = [];
            for await (const chunk of req) {
                body.push(chunk);
            }
            body = Buffer.concat(body).toString().split('=')[1];
            
            let prom = api_weather.searchCity(body);
            const resSearch = await prom;
            if (resSearch.statusCode == 200) {
                const arrSities = JSON.parse(resSearch.data);
                arrSities.forEach((city) => {
                    if (selectСities.findIndex(el => el.id === city.name) === -1) {
                        selectСities.push({ 'id': city.name, 'value': city.name })
                    }
                })
            }
            res.statusCode = 302;
            res.setHeader('Location', '/');
        }

    } else if (pathname === '/current') {
        if (method === 'GET') {
            let idx = selectСities.findIndex(el => el.id === query.id);
            const city = selectСities[idx];
            let promise = api_weather.current(city.id);
            let resCurrent = await promise;
            const cities = [];
            cities.push(JSON.parse(resCurrent.data));
            res.write(layoutStart);
            res.write(`<h2>Погода сейчас - (${city.value})</h2>`);
            res.write(getCurrentCityComponent(cities));
            res.write(layoutEnd)
        }

    } else if (pathname === '/delete') {
        selectСities = selectСities.filter(el => el.id !== query.id);
        res.statusCode = 302;
        res.setHeader('Location', '/');

    } else {
        res.statusCode = 404;
        res.write(layoutStart);
        res.write(`<h2>404 | Страница не найдена</h2>`);
        res.write(layoutEnd);
    }

    res.end()
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server running at http://localhost:3000/');
});