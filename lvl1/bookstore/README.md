# ДЗ 009-docker-2
## 1.  
* Создаем Dockerfile и выполняем сборку образа
```
docker build -t bookstore .
```
* пример запуска
```
docker run -it --rm --name bookstore -e PORT=3000 -p 3000:3000 bookstore
```
* Публикуем образ
```
docker tag bookstore abtank/bookstore:v1.0.0
```
```
docker push abtank/bookstore:v1.0.0
```



# ДЗ 010-db MongoDB

1. Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books:
```
db.books.insertMany([
  {
    title: "Книга 1",
    description: "Описание по Книга 1",
    authors: "Автор 1"
  },
  {
    title: "Книга 2",
    description: "Описание по Книга 2",
    authors: "Автор 2"
  }
]);
```

2. Запрос для поиска полей документов коллекции books по полю title:
```
db.books.find({ title: "Книга 1" });
```

3. Запрос для редактирования полей description и authors коллекции books по _id записи:
```
db.books.update(
  { _id: "98bece82-a373-472e-a6e9-529c3480cfe3" },
  { $set: { description: "новое описание", authors: "новые авторы" } 
  }
);
```
4. Обновление и удаление полей
```
db.books.update(
  { _id: "98bece82-a373-472e-a6e9-529c3480cfe3" },
  [
    { $set: { description: "новое описание", authors: "новые авторы" } },
    { $unset: [ "title", "fileBook" ] }
  ]
);
```
