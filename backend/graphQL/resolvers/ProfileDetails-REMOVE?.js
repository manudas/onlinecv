module.exports = {
    Query: {
        languages: async (
            { language },
            { models: { ProfileDetailsModel } },
            info
        ) => {
            const profileDetailsList =
                await ProfileDetailsModel.find({
                    language
                })
                    .sort({
                        order: 1
                    })
                    .exec();
            return profileDetailsList;
        }
    },
    Mutation: {
        putProfileDetail: async (
            parent,
            { ProfileDetails },
            { models: { ProfileDetailsModel } },
            info
        ) => {
            const WriteResult =
                await ProfileDetailsModel.update(
                    {
                        id: ProfileDetails.id
                    },
                    ProfileDetails,
                    {
                        upsert: true // if no details found, create a new entry
                    }
                );
            return WriteResult.nUpserted === 1 ||
                WriteResult.nModified === 1
                ? ProfileDetails
                : false;
        },
        removeProfileDetail: async (
            parent,
            { id },
            { models: { ProfileDetailsModel } },
            info
        ) => {
            const WriteResult =
                await ProfileDetailsModel.remove(
                    {
                        id
                    },
                    true
                ); // true == remove one
            return WriteResult.nRemoved === 1;
        }
    }
};
