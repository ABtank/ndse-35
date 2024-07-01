const { Schema, model } = require('mongoose')

const chatMessageSchema = new Schema({
    msg: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true ,ref: 'User'},
    roomId: { type: String, default: "" },
    dtCreate: { type: Date, default: new Date() }
})

module.exports = model('ChatMessage', chatMessageSchema);