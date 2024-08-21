class UserInc {
    name: string;
    lastName: string;
    private cart!: CartInc;
    protected info!: string;

    constructor(name: string, lastName: string) {
        this.name = name;
        this.lastName = lastName;
    }

    setCart(cart: CartInc) {
        this.cart = cart;
    }

}

class CartInc {
    // пересчет карзины
    refresh() {

    }

}

class TeacherInc extends UserInc {

    // поставить оценку
    setScore(student: StudentInc) {
        //
    }
}


class StudentInc extends UserInc {

    // получить общий балл
    getTotalScore(): number {
        return 0;
    }

    // protected видно в наследнике
    getInfo(): string{
        return this.info;
    }
}


const userInc: UserInc = new UserInc("Oleg", "Petrov");
const userCartInc: CartInc = new CartInc;
userInc.setCart(userCartInc);
