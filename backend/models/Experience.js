import {
    Schema,
    model,
} from 'mongoose';

const collection = 'experience';

const ExperienceSchema = new Schema({
    description: String,
    type: String, // professional, ong, other
    start_date: Date,
    finish_date: Date,
    role: String,
    company: String,
    company_url: String,
    keywords: {
        type: [String],
        default: undefined
    },
    details: {
        type: [String],
        default: undefined
    },
    language: String,
    order: Number,
}, {
    collection,
    versionKey: false
});

const ExperienceModel = model(collection, ExperienceSchema);

export {
    ExperienceSchema,
    ExperienceModel,
};