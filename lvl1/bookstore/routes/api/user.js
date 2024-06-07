const express = require('express')

const router = express.Router()

router.post(`/login`, (req, res) => {
    const authUser = { id: 1, mail: "test@mail.ru" };
    res.json(authUser)
    res.status(201)
})

module.exports = router