import {
    Schema,
    model,
} from 'mongoose';

const collection = 'resume';

const ResumeSchema = new Schema({
    data: Schema.Types.Buffer,
    keywords: {
        type: [String],
        default: undefined
    },
    language: String
}, {
    collection,
    versionKey: false
});

const ResumeModel = model(collection, ResumeSchema);

export {
    ResumeSchema,
    ResumeModel,
};