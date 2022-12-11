const {
    Schema,
    model,
} = require('mongoose');

const collection = 'translations';

const TranslationsSchema = new Schema({
    language: String,
    module: String,
    domain: String,
    tag: String,
    text: String,
    lastTimeFetched: Schema.Types.Date,
    missing: Boolean,
    accessCounter: Number
}, {
    collection,
    versionKey: false
});

const TranslationsModel = model(collection, TranslationsSchema);

module.exports = {
    TranslationsSchema,
    TranslationsModel,
};