import {
    Schema,
    model,
} from 'mongoose';

const collection = 'quotes';

const QuoteSchema = new Schema({
    author: String,
    quote: String,
    language: String,
}, {
    collection,
    versionKey: false
});

const QuoteModel = model(collection, QuoteSchema);

export {
    QuoteSchema,
    QuoteModel,
};