import 'reflect-metadata'


// console.clear();

function readTypes() {
    const decorator: MethodDecorator = (target, propertyKey, description) => {
        const args = Reflect.getMetadata('design:paramtypes', target, propertyKey)
            .map((c: { name: any; }) => c.name);

        const types = Reflect.getMetadata('design:returntype', target, propertyKey);

        console.log(args);
        console.log(types);
    };


    return decorator;
}

class Foo {

}

class Bar {

    @readTypes()
    public fn(a: number, b: string, c: Foo): boolean {
        return true;
    }
}

const bar = new Bar();
bar.fn(2,"str", new Foo());