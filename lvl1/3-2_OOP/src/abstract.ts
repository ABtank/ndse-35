
interface Area {
    getArea(): number;
}

abstract class Figure implements Area {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    abstract absGetInfo(): string;

    getName(): string {
        return "abstract Figure";
    }

    getArea(): number {
        console.log("Not Implemented");
        return 0;
    }
}


class Rectangel extends Figure {
    absGetInfo(): string {
        return "Rectangel";
    }
    
    getName(): string {
        return "Rectangel Figure";
    }

    constructor(width: number, height: number) {
        super(width, height);
    }
    getArea(): number {
        return this.width * this.height;
    }
}

const figure = new Rectangel(20, 40);
console.log(figure.getArea());


