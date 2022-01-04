const ObjectId = require('mongodb').ObjectId;
const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        experiences: async (
            { language, type },
            { models: { WorkExperienceModel } },
            info
        ) => {
            const experienceList =
                await WorkExperienceModel.find({
                    language,
                    ...(type ? { type } : {})
                })
                    .sort({
                        order: 1
                    })
                    .exec();
            return experienceList;
        }
    },
    Mutation: {
        putWorkExperience: async (
            { workExperiences },
            { models: { WorkExperienceModel } },
            info
        ) => {
            const WriteResult = await Promise.all(
                workExperiences.map(async (experience) => {
                    const cleanedObject = cleanObject(
                        experience,
                        {
                            id: '_id'
                        }
                    );

                    if (!cleanedObject._id) {
                        cleanedObject._id = new ObjectId();
                    }

                    const element =
                        await WorkExperienceModel.findOneAndUpdate(
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
        removeWorkExperience: async (
            { id },
            { models: { WorkExperienceModel } },
            info
        ) => {
            const WriteResult =
                await WorkExperienceModel.remove(
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
