import {
    Schema,
    model,
} from 'mongoose';

const collection = 'skills';

const SkillsSchema = new Schema({
    tag: String,
    description: String,
    skill_level: Number,
    related_knowledge: {}, // subquery ?
    type: String,
    developed_projects: [],
    keywords: {
        type: [String],
        default: undefined
    },
    language: String,
    order: Number
}, {
    collection,
    versionKey: false,
});

const SkillsModel = model(collection, SkillsSchema);

export {
    SkillsSchema,
    SkillsModel,
};