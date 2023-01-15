module.exports = {
    Query: {
        portfolio: async (
            { language },
            {
                models: {
                    PortfolioModel // configModel
                }
            },
            info
        ) => {
            const portfolioList = await PortfolioModel.find(
                {
                    language
                }
            )
                .sort({
                    order: 1
                })
                .exec();
            return portfolioList;
        }
    },
    Mutation: {
        putPortfolio: async (
            { Portfolio },
            { models: { PortfolioModel } },
            info
        ) => {
            const WriteResult = await PortfolioModel.update(
                {
                    id: Portfolio.id
                },
                Portfolio,
                {
                    upsert: true // if no details found, create a new entry
                }
            );
            return WriteResult.modifiedCount === 1 ||
                WriteResult.upsertedCount === 1
                ? Portfolio
                : false;
        },
        removePortfolio: async (
            { id },
            { models: { PortfolioModel } },
            info
        ) => {
            const WriteResult = await PortfolioModel.remove(
                {
                    id
                },
                true
            ); // true == remove one
            return WriteResult.deletedCount === 1;
        }
    }
};
