/*
 * FILE FOR THE CONNECTION TO MONGODB
 * DB FROM THE GraphQL LIBRARY
 */

import {
    Schema,
    model,
} from 'mongoose';

const collection = 'locale';

const LocaleSchema = new Schema({
    _id: Schema.Types.ObjectId, // We can also use String, as it casts to it
    name: String,
    iso: String,
    flag: String,
    default: Boolean,
}, {
    collection,
    versionKey: false,
});

const LocaleModel = model(collection, LocaleSchema);

export {
    LocaleSchema,
    LocaleModel,
};