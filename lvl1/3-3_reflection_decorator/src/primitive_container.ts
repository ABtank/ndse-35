class UserIOC {

}

class BookIOC {

}

const classMap = {
    UserIOC: new UserIOC,
    BookIOC: new BookIOC
};

const user1 = classMap.UserIOC;  // <-- получаем конкретную реализацию класса