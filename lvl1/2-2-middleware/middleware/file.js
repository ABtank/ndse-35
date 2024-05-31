const multer = require('multer')
const storage = multer.diskStorage({
    destination(request, file, callback) {
        // 1- error = null
        // 1- dir к файлам
        callback(null, './public/img')
    },
    filename(request, file, callback) {
        // 1- error = null
        // 1- имя файла
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

// фильтр типов
const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']
const fileFilter = (reg, file, callback) => {
    callback(null, allowedTypes.includes(file.mimetype))
};

module.exports = multer({ storage, fileFilter })