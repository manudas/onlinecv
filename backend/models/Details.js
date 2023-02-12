const {
    Schema,
    model,
} = require('mongoose');

const collection = 'personal_details';

const DetailsSchema = new Schema({
    profileImage: Schema.Types.Buffer,
    name: String,
    surname: String,
    address: String,
    // phone_number could be a number but also include digits shuch as + or -
    phone: String,
    birthInfo: String, // date && born city, province... and so on...
    email: String,
    // qr_code: String, // qr_code will be made on the fly
    keywords: {
        type: [String],
        default: undefined
    },
    language: String,
    primaryRole: String,
    secondaryRole: String,
    nickname: String,
    description: String
}, {
    collection,
    versionKey: false
});

const DetailsModel = model(collection, DetailsSchema);

module.exports = {
    DetailsSchema,
    DetailsModel,
};