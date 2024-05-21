#!/usr/bin/env node
// npm link
// npm unlink
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .option('year',{
        alias:"y",
        type:"boolean",
        default: false
    })
    .option('month',{
        alias:"m",
        type:"boolean",
        default: false
    })
    .option('date',{
        alias:"d",
        type:"boolean",
        default: false
    })
    .option('add',{
        type:"boolean",
        default: false
    })
    .option('sub',{
        type:"boolean",
        default: false
    })
    .argv;

let curDate = new Date();
let shift = 0;
if(argv._.includes('add')) {
    shift = argv._[1];    
} else if (argv._.includes('sub')){
    shift = -argv._[1];
} else {
    if(argv.y){
        console.log(curDate.getFullYear());
    } else if (argv.d){
        console.log(curDate.getDate());
    } else if (argv.m){
        console.log(curDate.getMonth());
    } else{
        console.log(curDate.toISOString());
    }
}

if(argv._.includes('add') || argv._.includes('sub')) {
    if(argv.y){
        curDate.setFullYear(curDate.getFullYear() + shift)
    } else if (argv.d){
        curDate.setDate(curDate.getDate() + shift)
    } else if (argv.m){
        curDate.setMonth(curDate.getMonth() + shift)
    }
    console.log(curDate.toISOString());
}
