const {
    Schema,
    model,
} = require('mongoose');

const collection = 'references';

const ReferenceSchema = new Schema({
    name: String,
    role: String,
    description: String,
    company: String,
    company_url: String,
    keywords: {
        type: [String],
        default: undefined
    },
    language: String,
    phone: String,
    email: String,
    order: Number,
}, {
    collection,
    versionKey: false
});

const ReferenceModel = model(collection, ReferenceSchema);

module.exports = {
    ReferenceSchema,
    ReferenceModel,
};