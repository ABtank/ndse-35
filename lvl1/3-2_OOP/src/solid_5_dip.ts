// принцип инверсии зависимостей
// обьектом зависимости должна быть абстракция, а не что-то конкретное


interface BankCard {
    isDebit: boolean;
    issuedAt: number;
}

class TinkoffCard implements BankCard {
    isDebit = true;
    issuedAt = 124512;

}

class AlfaCard implements BankCard {
    isDebit = false;
    issuedAt = 325235;
}

class SberCard implements BankCard {
    isDebit = true;
    issuedAt = 6454345;
}

type KnownCard = TinkoffCard | AlfaCard | SberCard;

class Bank {

    wrongGetMoney(cart: KnownCard, amount: number) {   // <--- неверно, надо зависить от абстракции а не от конкретной реализации

    }

    getMoney(cart: BankCard, amount: number) {

    }

}

