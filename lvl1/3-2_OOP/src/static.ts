class UserStat {
    static MAX_LEVEL = 80;
    static generatePassword(): string {
        return Math.random().toString(36).substr(2);
    }
}

const newUser = new UserStat;
console.log(UserStat.MAX_LEVEL);
console.log(UserStat.generatePassword());