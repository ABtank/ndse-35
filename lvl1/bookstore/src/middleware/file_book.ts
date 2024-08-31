import { v4 as uuid } from 'uuid';

import * as multer from 'multer';

const preservePath: string = './files/books';
const storage = multer.diskStorage({
    destination(request:any, file: any, callback: Function) {
        // 1- error = null
        // 1- dir к файлам
        callback(null, preservePath)
    },
    filename(request:any, file: any, callback: Function) {
        // 1- error = null
        // 1- имя файла
        const id = uuid()
        request.body.fileName = file.originalname
        request.body.fileBook = `${id}-${file.originalname}`
        callback(null, `${id}-${file.originalname}`)
    }
})

// фильтр типов
const allowedTypes = ['application/pdf', 'application/epub+zip', 'text/plain']
const fileFilter = (reg:any, file: any, callback: Function) => {
    callback(null, allowedTypes.includes(file.mimetype))
};

// фильтр отключил пока
// module.exports = multer({ storage: storage ,fileFilter: fileFilter})

export default multer({ storage: storage, dest: preservePath })