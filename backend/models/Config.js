const {
    Schema,
    model,
} = require('mongoose');

const collection = 'config';

const ConfigSchema = new Schema({
    key: String,
    value: Schema.Types.Mixed,
}, {
    collection,
    versionKey: false
});

const ConfigModel = model(collection, ConfigSchema);

module.exports = {
    ConfigSchema,
    ConfigModel,
};