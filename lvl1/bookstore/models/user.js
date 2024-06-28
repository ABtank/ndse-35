const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true }
})


const User = model('User', userSchema);

User.serializeUser = function (user, done) {
    done(null, user._id);
};

User.deserializeUser = function (id, done) {
    User.findById(id).select("-password")
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.error(err);
            done(err);
        }).se;
};

module.exports = User