import {
    Schema,
    model,
} from 'mongoose';
const collection = 'translations';
const TranslationsSchema = new Schema({
    language: String,
    module: String,
    tag: String,
    text: String
}, {
    collection,
});
const TranslationsModel = model(collection, TranslationsSchema);
export {
    TranslationsSchema,
    TranslationsModel,
};