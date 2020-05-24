const {
    Schema,
    model,
} = require('mongoose');

const collection = 'config';

// config collection but using buffer / binary schema
const ImageSchema = new Schema({
    value: Buffer,
    key: String
}, {
    collection,
});

const ImageModel = model(collection, ImageSchema);

module.exports = {
    ImageSchema,
    ImageModel,
};