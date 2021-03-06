const {
    Schema,
    model,
} = require('mongoose');

const collection = 'translations';

const TranslationsSchema = new Schema({
    language: String,
    module: String,
    tag: String,
    text: String,
    lastAccessed: Schema.Types.Date,
    accessCounter: Number
}, {
    collection,
});

const TranslationsModel = model(collection, TranslationsSchema);

module.exports = {
    TranslationsSchema,
    TranslationsModel,
};