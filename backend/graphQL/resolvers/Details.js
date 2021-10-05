const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        details: async({ // 1st arg: arguments
            language
        }, { // 2nd arg: context
            models: {
                DetailsModel,
            }
        }) => {
            // const details1 = await DetailsModel.find({ language: 'es' }); // lean to get the model as a plain javascript object
            const details = await DetailsModel.findOne({ language: language }).lean().exec(); // lean to get the model as a plain javascript object
            if (details) details.profileImage = details.profileImage && details.profileImage.toString();
            return details;
        },
    },
    Mutation: {
        putDetails: async({
            details,
        },
        {
            models: {
                DetailsModel
            },
        }, info
        ) => {
            const cleanedDetails = cleanObject(details, {'id': '_id'});
            const DetailsRemovalResult = await DetailsModel.remove({ language: cleanedDetails.language }, { justOne: true });
            const document = new DetailsModel(cleanedDetails);
            const DetailsWriteResult = await document.save();

            return DetailsWriteResult ?? false;
        },
    },
};