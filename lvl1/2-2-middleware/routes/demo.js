const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/file')

// cover-img - имя ключа в форме по которому лежит ключ
router.post('/upload-img',
    fileMulter.single('cover-img'),
    (req, res) => {
        if (req.file) {
            const { path } = req.file
            res.json({ path })
        }
        res.json()
    })

// получение файла если не в статике лежит
router.get('/upload-img/:id', (req, res) => {
    const { id } = req.params
    res.download(`public/img/${id}`, `${id}`, err => {
        if (err) {
            res.status(404).json();
        }
    })
})

module.exports = router