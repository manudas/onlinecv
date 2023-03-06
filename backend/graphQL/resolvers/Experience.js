const ObjectId = require('mongodb').ObjectId;
const cleanAndMapObject = require('@helpers/utils').cleanAndMapObject;

module.exports = {
    Query: {
        experiences: async (
            _parent,
            { language, type },
            { models: { ExperienceModel } },
            _info
        ) => {
            const experienceList =
                await ExperienceModel.find({
                    language,
                    ...(type ? { type } : {})
                })
                    .sort({
                        order: 1
                    })
                    .exec();
            return experienceList;
        },
        experienceTypes: () => ['professional', 'ong', 'other']
    },
    Mutation: {
        putExperience: async (
            _parent,
            { experiences },
            { models: { ExperienceModel } },
            _info
        ) => {
            const WriteResult = await Promise.all(
                experiences.map(async (experience) => {
                    const cleanedObject = cleanAndMapObject(
                        experience,
                        {
                            id: '_id'
                        }
                    );

                    if (!cleanedObject._id) {
                        cleanedObject._id = new ObjectId();
                    }

                    const element =
                        await ExperienceModel.findOneAndUpdate(
                            {
                                _id: cleanedObject._id
                            },
                            cleanedObject,
                            {
                                upsert: true, // if no details found, create a new entry
                                new: true // return the value of the object after the update and not before
                            }
                        );

                    return element;
                })
            );
            return WriteResult ? WriteResult : false;
        },
        removeExperience: async (
            _parent,
            { id },
            { models: { ExperienceModel } },
            _info
        ) => {
            const WriteResult =
                await ExperienceModel.remove(
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
};
