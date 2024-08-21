class User {
    // Определение свойств класса User
    constructor(public name: string, public email: string) {}
}

class BaseTariff {
    user: User;
    firstDay = true;
    protected type = 'base';

    constructor(user: User){
        this.user = user;
    }
}

class BaseTariffPlus extends BaseTariff {
    secondDay = true;
    recording = true;
    type = 'base-plus';
}

class PremiumTariff extends BaseTariffPlus {
    dinner = true;
    networking = true;
    type = 'base-premium';
}

const user = new User('John Doe',"email@bk.ru");

const bTariff: BaseTariff = new BaseTariff(user);
const bTariffPlus: BaseTariffPlus = new BaseTariffPlus(user);
const premiumTariff: PremiumTariff = new PremiumTariff(user);