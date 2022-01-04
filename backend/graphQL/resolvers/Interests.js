module.exports = {
    Query: {
        interests: async (
            {
                // 1st arg: arguments
                language
            },
            {
                // 2nd arg: context
                models: { InterestsModel }
            },
            info
        ) => {
            const interestList = await InterestsModel.find({
                language: language
            })
                .sort({
                    order: 1
                })
                .exec();
            return interestList;
        }
    },
    Mutation: {
        putInterest: async (
            parent,
            { Interest },
            { models: { interestsModel } },
            info
        ) => {
            const WriteResult = await interestsModel.update(
                {
                    id: Interest.id
                },
                Interest,
                {
                    upsert: true // if no details found, create a new entry
                }
            );
            return WriteResult.nUpserted === 1 ||
                WriteResult.nModified === 1
                ? Interest
                : false;
        },
        removeInterest: async (
            parent,
            { id },
            { models: { interestsModel } },
            info
        ) => {
            const WriteResult = await interestsModel.remove(
                {
                    id
                },
                true
            ); // true == remove one
            return WriteResult.nRemoved === 1;
        }
    }
};
