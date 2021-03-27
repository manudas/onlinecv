var mongoose = require('mongoose');
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
    _id: mongoose.Schema.Types.ObjectId, // We can also use String, as it casts to it
    name: String,
    iso: String,
    default: Boolean,
}, {
    collection,
});

const LocaleModel = model(collection, LocaleSchema);

module.exports = {
    LocaleSchema,
    LocaleModel,
};