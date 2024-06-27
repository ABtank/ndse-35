const express = require('express')
const router = express.Router()

router.get("/me", (req, res) => {
    res.render('user/me', {
        title: "Профиль"
    })
});


module.exports = router