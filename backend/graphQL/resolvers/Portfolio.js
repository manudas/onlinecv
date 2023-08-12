import { ObjectId } from 'mongodb';
import { cleanAndMapObject } from 'app/helpers/utils.js';

const portfolioListAsStringPicture = (portfolioList) => {
    let result = portfolioList;
    if (portfolioList) result = portfolioList.map(element => { return {...element, pictures: [...element.pictures.map(picture => picture.toString())] }});
    return result;
}

export default {
    Query: {
        portfolio: async (
            _parent,
            { language },
            {
                models: {
                    PortfolioModel // configModel
                }
            },
            _info
        ) => {
            let portfolioList = await PortfolioModel.find(
                {
                    language
                }
            )
                .sort({
                    order: 1
                })
                .lean() // lean to get the model as a plain javascript object
                .exec();
            return portfolioListAsStringPicture(portfolioList);
        }
    },
    Mutation: {
        putPortfolio: async (
            _parent,
            { portfolio },
            { models: { PortfolioModel } },
            _info
        ) => {
            const WriteResult = await Promise.all(
                portfolio.map(async (singlePortfolioElement) => {
                    const cleanedPortfolioElement = cleanAndMapObject(
                        singlePortfolioElement,
                        { id: '_id' }
                    );

                    if (!cleanedPortfolioElement._id) {
                        cleanedPortfolioElement._id = new ObjectId();
                    }

                    const element =
                        await PortfolioModel.findOneAndUpdate(
                            { _id: cleanedPortfolioElement._id },
                            cleanedPortfolioElement,
                            {
                                upsert: true, // if no details found, create a new entry
                                new: true // return the value of the object after the update and not before
                            }
                        ).lean() // plain JS object
                        .exec();

                    return element;
                })
            );
            return WriteResult ? portfolioListAsStringPicture(WriteResult) : false;
        },
        removePortfolio: async (
            _parent,
            { id },
            { models: { PortfolioModel } },
            _info
        ) => {
            const WriteResult = await PortfolioModel.remove(
                {
                    _id: id
                },
                { justOne: true }
            );
            return WriteResult.deletedCount === 1;
        }
    }
};
