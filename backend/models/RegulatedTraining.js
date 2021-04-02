const {
    Schema,
    model,
} = require('mongoose');

const collection = 'training';

const TrainingSchema = new Schema({
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

const TrainingModel = model(collection, TrainingSchema);

module.exports = {
    TrainingSchema,
    TrainingModel,
};