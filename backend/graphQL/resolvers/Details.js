import { cleanAndMapObject } from 'app/helpers/utils.js';

export default {
    Query: {
        details: async (
            _parent,
            {
                // 2st arg: arguments
                language
            },
            {
                // 3nd arg: context
                models: { DetailsModel }
            },
            _info
        ) => {
            const details = await DetailsModel.findOne({
                language: language
            })
                .lean()
                .exec(); // lean to get the model as a plain javascript object
            if (details) details.profileImage = details?.profileImage.toString();
            return details;
        }
    },
    Mutation: {
        putDetails: async (
            _parent,
            { details },
            { models: { DetailsModel } },
            _info
        ) => {
            const cleanedDetails = cleanAndMapObject(details, {
                id: '_id'
            });
            const DetailsRemovalResult =
                await DetailsModel.remove(
                    { language: cleanedDetails.language },
                    { justOne: true }
                );
            const document = new DetailsModel(
                cleanedDetails
            );
            const DetailsWriteResult =
                await document.save();

            return DetailsWriteResult ?? false;
        }
    }
};
