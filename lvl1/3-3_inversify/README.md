### Инициализация проекта
```
npm init -y
```
```
npm i -D typescript
```
```
npm i -S reflect-metadata inversify
```
настройка tsconfig.json
```
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6", "dom"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```