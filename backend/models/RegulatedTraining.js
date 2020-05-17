import {
    Schema,
    model,
} from 'mongoose';
const collection = 'regulated_training';
const RegulatedTraining = new Schema({
    name: String,
    description: String,
    type: String,
    school: String,
    start_date: Date,
    finish_date: Date,
    final_project: String,
    school_url: String,
    average_school: Number,
    keywords: [],
    language: String
}, {
    collection,
});
const RegulatedTrainingModel = model(collection, RegulatedTrainingSchema);
export {
    RegulatedTraining,
    RegulatedTrainingModel,
};