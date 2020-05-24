const {
    Schema,
    model,
} = require('mongoose');

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

module.exports = {
    PortfolioSchema,
    PortfolioModel,
};