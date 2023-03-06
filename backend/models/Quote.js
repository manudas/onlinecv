const {
    Schema,
    model,
} = require('mongoose');

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

module.exports = {
    QuoteSchema,
    QuoteModel,
};