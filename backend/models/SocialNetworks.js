const {
    Schema,
    model,
} = require('mongoose');

const collection = 'social_networks';

const SocialNetworksSchema = new Schema({
    language: String,
    label: String,
    text: String,
    order: Number
}, {
    collection,
});

const SocialNetworksModel = model(collection, SocialNetworksSchema);

module.exports = {
    SocialNetworksSchema,
    SocialNetworksModel,
};