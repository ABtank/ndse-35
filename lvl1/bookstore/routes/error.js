const express = require('express')
const router = express.Router()

router.get('/:code',
  (req, res) => {
    res.render('errors/error', {
      title: "Главная",
      error: errors[errors.findIndex(el => el.code === req.params.code || '404')] || errors[0],
    })
  })


module.exports = router

const errors = [
  { code: '404', title: 'страница не найдена', descr: 'Что-то пошло не так, попробуйте еще раз.' },
];