import {
    Schema,
    model,
} from 'mongoose';
const collection = 'portfolio';
const PortfolioSchema = new Schema({
    name: String,
    description: String,
    keywords: [],
    language: String,
    url: String,
    picture: Buffer
}, {
    collection,
});
const PortfolioModel = model(collection, PortfolioSchema);
export {
    PortfolioSchema,
    PortfolioModel,
};