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
    written_level: Number,
    spoken_level: Number,
    keywords: [],
    language: String,
    order: Number
}, {
    collection,
    versionKey: false,
});

const LanguagesModel = model(collection, LanguagesSchema);

module.exports = {
    LanguagesSchema,
    LanguagesModel,
};