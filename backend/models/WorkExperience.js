import {
    Schema,
    model,
} from 'mongoose';
const collection = 'professional_experience';
const WorkExperienceSchema = new Schema({
    name: String,
    description: String,
    start_date: Date,
    finish_date: Date,
    post: String,
    company: String,
    company_url: String,
    keywords: [],
    language: String
}, {
    collection,
});
const WorkExperienceModel = model(collection, WorkExperienceSchema);
export {
    WorkExperienceSchema,
    WorkExperienceModel,
};