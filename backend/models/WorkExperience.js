const {
    Schema,
    model,
} = require('mongoose');

const collection = 'professional_experience';

const WorkExperienceSchema = new Schema({
    name: String,
    description: String,
    start_date: Date,
    finish_date: Date,
    role: String,
    company: String,
    company_url: String,
    keywords: [],
    language: String,
    order: Number,
}, {
    collection,
    versionKey: false
});

const WorkExperienceModel = model(collection, WorkExperienceSchema);

module.exports = {
    WorkExperienceSchema,
    WorkExperienceModel,
};