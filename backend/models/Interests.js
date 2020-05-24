const {
    Schema,
    model,
} = require('mongoose');

const collection = 'interests';

const InterestsSchema = new Schema({
    name: String,
    description: String,
    keywords: [],
    language: String
}, {
    collection,
});

const InterestsModel = model(collection, InterestsSchema);

module.exports = {
    InterestsSchema,
    InterestsModel,
};