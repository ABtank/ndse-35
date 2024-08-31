import * as fs from 'fs';
import * as os from 'os';
import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction): void => {
    const now = new Date();
    const { url, method } = req;

    const data = `${now.toISOString()} ${method} ${url}`;

    // os.EOL перенос строки
    fs.appendFile("server.log", data + os.EOL, (err) => {
        if (err) throw err;
    });

    // вызываем next() чтоб передать управление остальным функциям
    next();
};

export default logger;
