## TS

### Инициализация проекта
 ```
 npm init -y
 npm i -D typescript
 ```

 TS init
 ```
 npx tsc --init
 ```

 Настройка ```tsconfig.ts```

 Скрипт запуска компиляции в ```packge.json```
 ```
 "build": "npx tsc --project ./tsconfig.json --watch"
 ```


## ESLint
### Добавить в проект пакеты ESLint

```
npm i -D eslint@^8.56.0
```
парсер для TS
```
npm i -D @typescript-eslint/parser@7.17.0
```
плагин правил проверки по TS
```
npm i -D @typescript-eslint/eslint-plugin
```

### Создать файл конфигурации ```.eslint.json```
```
npx eslint --init
```

миграция конфигов из eslintrs.json в .eslintrs.mjs
```
npx @eslint/migrate-config .eslintrc.json
```
скрипт для запука eslint
```
"eslint": "eslint --cache src/*{.js,.jsx,.ts,.tsx}"
```