import {
    Schema,
    model,
} from 'mongoose';

const collection = 'social_networks';

const SocialNetworksSchema = new Schema({
    language: String,
    label: String,
    description: String,
    url: String,
    order: Number
}, {
    collection,
    versionKey: false
});

const SocialNetworksModel = model(collection, SocialNetworksSchema);

export {
    SocialNetworksSchema,
    SocialNetworksModel,
};