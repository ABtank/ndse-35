const { v4: uuid } = require('uuid')

const preservePath = './files/books'
const multer = require('multer')
const storage = multer.diskStorage({
    destination(request, file, callback) {
        // 1- error = null
        // 1- dir к файлам
        callback(null, preservePath)
    },
    filename(request, file, callback) {
        // 1- error = null
        // 1- имя файла
        const id = request.params.id || request.body.id || uuid()
        request.body.id=id
        request.body.fileName=file.originalname
        request.body.fileBook=`${id}-${file.originalname}`
        callback(null, `${id}-${file.originalname}`)
    }
})

// фильтр типов
const allowedTypes = ['application/pdf', 'application/epub+zip','text/plain']
const fileFilter = (reg, file, callback) => {
    callback(null, allowedTypes.includes(file.mimetype))
};

// фильтр отключил пока
// module.exports = multer({ storage: storage ,fileFilter: fileFilter})

module.exports = multer({ storage: storage, preservePath})