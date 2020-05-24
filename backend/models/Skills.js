const {
    Schema,
    model,
} = require('mongoose');

const collection = 'skills';

const SkillsSchema = new Schema({
    name: String,
    description: String,
    skill_level: Number,
    related_knowledge: {}, // subquery ?
    type: String,
    developed_projects: [],
    keywords: [],
    language: String
}, {
    collection,
});

const SkillsModel = model(collection, SkillsSchema);

module.exports = {
    SkillsSchema,
    SkillsModel,
};