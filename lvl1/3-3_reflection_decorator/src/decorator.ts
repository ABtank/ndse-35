
// декоратор класса
function Specs (numGears: number, numWheels: number) {
    return function<T extends {new (...args: any[]):{}}> (constructor: T){
        return class extends constructor {
            gears = numGears;
            wheels = numWheels;
        }
    }
}



@Specs(3,4)
class Wagon {
    make: string;
    constructor(make:string){
        this.make = make;
    }
}

console.log(new Wagon("Nissan"));




// декоратор методов класса 
// принимает 3 параметра
// target - обьект в котором содержатся конструктор и методы объявленные внутри класса
// name - имя метода, для которого вызывается декоратор
// descripter - объект дескриптора, соответствующий методу, для которого вызывается декоратор

const log = (target: any, propertyKey: any, descriptor:  any) => {
    if(descriptor){
        const original = descriptor.value;
        descriptor.value = function(...args: any[]){
            const className = this.constructor.name;
            console.log(
                `LOG: ${className}::${propertyKey} (${args.join(", ")})`
            );
            return original.call(this,args)
        }
        return descriptor;
    }
}

class User {
    @log
    greet (name: any) {
        console.log(`Hello, ${name}!`);
    }
}

const user = new User();

user.greet("Alex");


