import mongoose, { Schema, Document, model } from 'mongoose';

// Интерфейс для сообщений чата
interface IChatMessage extends Document {
    msg: string;
    userId: mongoose.Types.ObjectId;
    roomId?: string; // Опциональный параметр
    dtCreate?: Date; // Опциональный параметр
}

// Схема для сообщений чата
const chatMessageSchema = new Schema<IChatMessage>({
    msg: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    roomId: { type: String, default: "" },
    dtCreate: { type: Date, default: () => new Date() } // Используем функцию для установки значения по умолчанию
});

// Экспортируем модель
export const ChatMessage = model<IChatMessage>('ChatMessage', chatMessageSchema);