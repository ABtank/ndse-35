import { Schema, model, Document } from 'mongoose';
import { User } from '../dto/user';


// Создание схемы пользователя
const userSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true }
});

// Создание модели пользователя
export const UserModel = model<User & Document>('User', userSchema);