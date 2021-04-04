const {
    Schema,
    model,
} = require('mongoose');

const collection = 'social_networks';

const SocialNetworksSchema = new Schema({
    language: String,
    label: String,
    description: String,
    url: String,
    order: Number
}, {
    collection,
});

const SocialNetworksModel = model(collection, SocialNetworksSchema);

module.exports = {
    SocialNetworksSchema,
    SocialNetworksModel,
};