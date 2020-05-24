const {
    Schema,
    model,
} = require('mongoose');

const collection = 'personal_details';

const DetailsSchema = new Schema({
    name: String,
    surname: String,
    address: String,
    // phone_number could be a number but also include digits shuch as + or -
    phone_number: String,
    birth_date: Date, // date
    email: String,
    // qr_code: String, // qr_code will be made on the fly
    keywords: [],
    language: String,
    primaryJobName: String,
    secondaryJobName: String,
    nickname: String
}, {
    collection,
});

const DetailsModel = model(collection, DetailsSchema);

module.exports = {
    DetailsSchema,
    DetailsModel,
};