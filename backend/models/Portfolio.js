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
    pictures: [{
        type: {
            name: String,
            description: String,
            data: Schema.Types.Buffer,
        },
        default: undefined
    }]
}, {
    collection,
    versionKey: false
});

const PortfolioModel = model(collection, PortfolioSchema);

export {
    PortfolioSchema,
    PortfolioModel,
};