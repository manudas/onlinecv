/*
 * FILE FOR THE CONNECTION TO MONGODB
 * DB FROM THE GraphQL LIBRARY
 */

const {
    Schema,
    model,
} = require('mongoose');

const collection = 'locale';

const LocaleSchema = new Schema({
    name: String,
    iso: String,
}, {
    collection,
});

const LocaleModel = model(collection, LocaleSchema);

module.exports = {
    LocaleSchema,
    LocaleModel,
};