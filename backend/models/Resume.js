const {
    Schema,
    model,
} = require('mongoose');

const collection = 'resume';

const ResumeSchema = new Schema({
    data: Schema.Types.Buffer,
    keywords: [String],
    language: String
}, {
    collection,
    versionKey: false
});

const ResumeModel = model(collection, ResumeSchema);

module.exports = {
    ResumeSchema,
    ResumeModel,
};