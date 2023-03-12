import {
    Schema,
    model,
} from 'mongoose';

const collection = 'interests';

const InterestsSchema = new Schema({
    name: String,
    description: String,
    keywords: {
        type: [String],
        default: undefined
    },
    language: String
}, {
    collection,
});

const InterestsModel = model(collection, InterestsSchema);

export {
    InterestsSchema,
    InterestsModel,
};