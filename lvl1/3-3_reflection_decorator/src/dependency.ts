class User {

}

interface IUserRepository {
    findAll(): Promise<User[]>
}

class UserRepository implements IUserRepository {
    findAll(): Promise<User[]> {
        return new Promise<User[]>(resolve => {
            resolve([new User]);
        });
    }
}


@Reflect.metadata('INJECT', ['Репозиторий пользователя'])
export class UserService {

    // 1) DI внедрение  зависимости через конструктор 
    repository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    // 2) DI внедрение  зависимости через свойства (через гетеры и сетеры)
    protected _repository2: IUserRepository;

    get repository2(): IUserRepository {
        return this._repository2
    }

    set repository2(repository: IUserRepository) {
        this._repository2 = repository;
    }


    getAllUsers() {
        return this.repository.findAll();
    }
}



// 3) DI внедрение  зависимости через метод Injection
interface IProduct {
    id: number;
    name: string;
    price: number;
}

class Cart {
    add(product: IProduct, quantity: number) {

    }
}