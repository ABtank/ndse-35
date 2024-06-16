## Less 2-5 Docker vol.2

### Part.1 Dockerfile
#### Отладочный контейнер под проект на node

1. Запуск контейнера
```
docker run -it --rm --name counter -v ${PWD}/2-5:/app -w /app node:20.10 /bin/bash
```
2. Инит проекта
```
npm init -y
npm i express
npm i -D nodemon
```
3. В package.json
```
"main": "src/server.js",
  "scripts": {
    "server": "node src/server.js",
    "dev": "nodemon -L"
  },
```
```
npm run dev
```

## Контейнеризация
### 1. Сборка образа (docker build)
```
docker build [options] path | url | -
```
 * точка (.) это корень проекта где лежит Dockerfile
 * имя образа my-repo/my-image:latest
```
docker build -t my-repo/my-image:latest .
```
### 2. Пример сборки образа (image)
* Dockerfile
```
FROM node:20.10
WORKDIR /app

ARG NODE_ENV=production

COPY ./*.json ./
RUN npm install
COPY ./src src/
CMD ["npm","run","dev"]
```
* сборка 
```
docker build -t counter .
```
* Запуск контейнера name=counter из образа counter
```
docker run -it --rm --name counter -e PORT=3002 -p 80:3002 counter
```

### 3. Публикация образа
1. Собрать образ через ``` docker build ```
2. Создать репозиторий на Docker Hub через  [веб-интерфейс](https://hub.docker.com/)
3. Назначить тег образу ``` docker tag ```
```
docker tag counter abtank/counter:v1.0.0
```
4. Опубликовать образ ``` docker push ```
```
docker push abtank/counter:v1.0.0
```
5. Запуск опубликованного
```
docker run -it --rm --name counter -e PORT=3002 -p 80:3002 abtank/counter:v1.0.0
```

### 4. Сборка образа без Dockerfile
* запустить контейнер
```
docker run -it  --rm  --name builder -w/app -e NODE_ENV=production node:20.10-alpine
```
В новом терминале 
Положить в докер файлы 
```
docker cp package.json builder:/app
docker cp package-lock.json builder:/app
```
развернуть проект
```
docker exec -it  builder npm install
```
копируем собранное в папку app в корень
```
docker cp ./src builder:/app
```
Зафиксировать контейнер в виде образа с именем и тегом (counter:build)
зафиксируем команду запуска ```-c CMD ["npm","run","dev"]```
```
docker commit -c 'CMD ["npm","run","dev"]' builder counter:build
```
гасим запущенный докер


### 5. Получить образ в виде файла 
* ключ ```-o``` задает имя файла (расширение не важно) ```counter:build``` имя образа который хотим сохранить
```
docker image save -o counter.img  counter:build
```
* запустить из созданного файла
```
docker image load -i counter.img
```

### Part.2 docker_compose.yml
* пример файла
```
version: '3.9' # версия формата (необязательно)
services:

  storage: # сервис с именем storage
    image: redis # используется образ redis:latest
    volumes:
      - logs_data:/var/log # подключает диск

  counter: # сервис с именем counter
    build: ./counter # собирает образ из папки ./counter
    volumes:
      - ./counter:/app # подключает диск с кодом
    ports:
      -80:3001 # мапит порт 80 хоста на порт контейнера
    environment:
      - PORT=3001 # передает переменные среды
      - STORAGE_URL=storage
    command: npm run dev # команда запуска
    depends_on:
      -  storage # устанавливает зависимость от сервиса storage

volumes:
  logs_data: {} # создает именнованый диск logs_data
```

* Запуск из нестандартного названного файла docker-compose
``` 
docker compose -f docker-compose.dev.yml up
```
* установить зависимость в уже запущеном докере
```
docker compose -f docker-compose.dev.yml exec -it counter npm install redis
```
* проверить наличие контейнеров
```
docker compose -f docker-compose.dev.yml ps -a
```
* удалить
```
docker compose -f docker-compose.dev.yml down
```

