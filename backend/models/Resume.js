import {
    Schema,
    model,
} from 'mongoose';
const collection = 'resume';
const ResumeSchema = new Schema({
    resume: String,
    keywords: [],
    language: String
}, {
    collection,
});
const ResumeModel = model(collection, ResumeSchema);
export {
    ResumeSchema,
    ResumeModel,
};