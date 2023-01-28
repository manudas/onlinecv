const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        quote: async (
            // 1st arg: arguments
            {
                language,
            },
            // 2nd arg: context
            {
                models: { QuoteModel }
            },
            info
        ) => {
            const quote = await QuoteModel.findOne({
                language
            })
            return quote
        }
    },
    Mutation: {
        putQuote: async (
            // 1st arg: arguments
            {
                quote,
            },
            // 2nd arg: context
            {
                models: { QuoteModel }
            },
            info
        ) => {
            const cleanedSettings = cleanObject(quote, {
                id: '_id'
            });
            const QuoteRemovalResult =
                await QuoteModel.deleteOne(
                    { language: cleanedSettings.language },
                );
            const document = new QuoteModel(
                cleanedSettings
            );
            return await document.save();
        },
        removeQuote: async (
            { id },
            { models: { QuoteModel } },
            info
        ) => {
            const WriteResult =
                await QuoteModel.remove(
                    {
                        _id: id
                    },
                    {
                        justOne: true
                    }
                ); // remove just one
            return WriteResult.deletedCount === 1;
        }
    }
}
