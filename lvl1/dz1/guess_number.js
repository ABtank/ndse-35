#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const minNumber = 1;
const maxNumber = 100;

const guessedNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

console.log(`Загадано число в диапазоне от ${minNumber} до ${maxNumber}`);

rl.on('line', (input) => {
    const number = parseInt(input);
    
    if (isNaN(number)) {
        console.log('Пожалуйста, введите число.');
        return;
    }
    
    if (number > guessedNumber) {
        console.log('Меньше');
    } else if (number < guessedNumber) {
        console.log('Больше');
    } else {
        console.log(`Отгадано число ${guessedNumber}`);
        rl.close();
    }
});
