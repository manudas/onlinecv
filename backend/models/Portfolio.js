import {
    Schema,
    model,
} from 'mongoose';

const collection = 'portfolio';

const PortfolioSchema = new Schema({
    name: String,
    description: String,
    keywords: {
        type: [String],
        default: undefined
    },
    language: String,
    order: Number,
    url: String,
    pictures: [Schema.Types.Buffer],
}, {
    collection,
    versionKey: false
});

const PortfolioModel = model(collection, PortfolioSchema);

export {
    PortfolioSchema,
    PortfolioModel,
};