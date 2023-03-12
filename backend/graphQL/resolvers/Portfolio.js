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
            _parent,
            { Portfolio },
            { models: { PortfolioModel } },
            _info
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
            _parent,
            { id },
            { models: { PortfolioModel } },
            _info
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
