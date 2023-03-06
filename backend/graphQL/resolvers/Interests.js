module.exports = {
    Query: {
        interests: async (
            _parent,
            {
                // 1st arg: arguments
                language
            },
            {
                // 2nd arg: context
                models: { InterestsModel }
            },
            _info
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
            _parent,
            { Interest },
            { models: { interestsModel } },
            _info
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
            return WriteResult.modifiedCount === 1 ||
                WriteResult.upsertedCount === 1
                ? Interest
                : false;
        },
        removeInterest: async (
            _parent,
            { id },
            { models: { interestsModel } },
            _info
        ) => {
            const WriteResult = await interestsModel.remove(
                {
                    id
                },
                true
            ); // true == remove one
            return WriteResult.deletedCount === 1;
        }
    }
};
