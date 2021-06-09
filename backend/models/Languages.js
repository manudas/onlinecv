const {
    Schema,
    model,
} = require('mongoose');

const collection = 'languages';

const LanguagesSchema = new Schema({
    name: String,
    certification: String,
    school: String,
    school_url: String,
    written_level: String,
    spoken_level: String,
    keywords: [],
    language: String
}, {
    collection,
    versionKey: false,
});

const LanguagesModel = model(collection, LanguagesSchema);

module.exports = {
    LanguagesSchema,
    LanguagesModel,
};