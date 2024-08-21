// Принцип единой ответственности
// каждый класс должен решать лишь одну задачу

// не правильно
// class UserSRP {
//     getLessons(){

//     }

//     setScore(){

//     }

//     refreshCart(){

//     }
// }


// Правильно
class UserSRP {

}


class CartSRP {
    refreshCart() { }

}

class TeacherSRP extends UserSRP {
    setScore() { }
}


class StudentSRP extends UserSRP {
    getLessons() { }

}