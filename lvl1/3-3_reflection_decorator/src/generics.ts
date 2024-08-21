class Box<T> {
    container: T[];

    constructor() {
        this.container = [];
    }

    add(value: T) {
        this.container.push(value);
    }

    pop(): T {
        return this.container.pop();
    }

    count(): number {
        return this.container.length;
    }
}

const stringBox = new Box<string>();
const numberBox = new Box<number>();

stringBox.add("one srt");
numberBox.add(42);