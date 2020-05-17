import {
    Schema,
    model,
} from 'mongoose';
const collection = 'profile';
const ProfileDetailsSchema = new Schema({
    language: String,
    label: String,
    text: String,
    order: Number
}, {
    collection,
});
const ProfileDetailsModel = model(collection, ProfileDetailsSchema);
export {
    ProfileDetailsSchema,
    ProfileDetailsModel,
};