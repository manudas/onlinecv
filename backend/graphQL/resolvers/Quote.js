const cleanAndMapObject = require('app/helpers/utils').cleanAndMapObject;

module.exports = {
    Query: {
        quote: async (
            _parent,
            // 1st arg: arguments
            {
                language,
            },
            // 2nd arg: context
            {
                models: { QuoteModel }
            },
            _info
        ) => {
            const quote = await QuoteModel.findOne({
                language
            })
            return quote
        }
    },
    Mutation: {
        putQuote: async (
            _parent,
            // 1st arg: arguments
            {
                quote,
            },
            // 2nd arg: context
            {
                models: { QuoteModel }
            },
            _info
        ) => {
            const cleanedSettings = cleanAndMapObject(quote, {
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
            _parent,
            { id },
            { models: { QuoteModel } },
            _info
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
