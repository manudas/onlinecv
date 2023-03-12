import {
    Schema,
    model,
} from 'mongoose';

const collection = 'languages';

const LanguagesSchema = new Schema({
    name: String,
    certification: String,
    school: String,
    school_url: String,
    written_level: Number,
    spoken_level: Number,
    keywords: {
        type: [String],
        default: undefined
    },
    language: String,
    order: Number
}, {
    collection,
    versionKey: false,
});

const LanguagesModel = model(collection, LanguagesSchema);

export {
    LanguagesSchema,
    LanguagesModel,
};