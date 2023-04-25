import {
    Schema,
    model,
} from 'mongoose';

const collection = 'messages';

const MessagesSchema = new Schema({
    name: String,
    from: String,
    to: String,
    subject: String,
    message: String,
    date: Schema.Types.Date,
    hasBeenRead: Boolean,
    type: String
}, {
    collection,
    versionKey: false
});

const MessagesModel = model(collection, MessagesSchema);

export {
    MessagesSchema,
    MessagesModel,
};