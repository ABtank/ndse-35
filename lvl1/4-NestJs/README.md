### Установка Nest CLI глобально
```
npm i -g @nestjs/cli
```
### Создание проекта
```
nest new name_project
```
### Основные команды
```
nest -h 
nest build -h 
nest start
nest info
nest new
nest generate
nest add
nest update
```
### Запуск в режиме разработки
```
npm run start:dev
```


## Настройка БД
### Установка ORM postgres
```
npm install @nestjs/typeorm typeorm pg
```
### Установка Mongoose
```
npm install @nestjs/mongoose mongoose
```

## Установка для работы с env
```
npm i --save @nestjs/config
```

## Генерация шаблона модуля
```
nest g module todo
nest g controller todo
nest g service todo
```
## Пример POST
```
curl localhost:3000/todo -H "Content-Type: application/json" -X POST -d '{"title":"first Post","descr":"Do it!","text":"longer text"}'
curl localhost:3000/todo/66d652a78936f24341ddcf79 -H "Content-Type: application/json" -X PUT -d '{"title":"first PUT","descr":"Do it!","text":"longer text"}'
curl localhost:3000/todo/66d652a78936f24341ddcf79 -X DELETE 
```