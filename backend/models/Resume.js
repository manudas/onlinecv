const {
    Schema,
    model,
} = require('mongoose');

const collection = 'resume';

const ResumeSchema = new Schema({
    resume: String,
    keywords: [],
    language: String
}, {
    collection,
});

const ResumeModel = model(collection, ResumeSchema);

module.exports = {
    ResumeSchema,
    ResumeModel,
};