const ObjectId = require('mongodb').ObjectId;
const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        trainings: async (
            { language, type },
            { models: { TrainingModel } },
            info
        ) => {
            const trainingList = await TrainingModel.find({
                language,
                ...(type ? { type } : {})
            })
                .sort({
                    order: 1
                })
                .exec();
            return trainingList;
        },
        trainingTypes: ['official', 'computer', 'other']
    },
    Mutation: {
        putTrainings: async (
            { trainings },
            { models: { TrainingModel } },
            info
        ) => {
            const TrainingWriteResult = await Promise.all(
                trainings.map(async (training) => {
                    const cleanedTraining = cleanObject(
                        training,
                        { id: '_id' }
                    );

                    if (!cleanedTraining._id) {
                        cleanedTraining._id =
                            new ObjectId();
                    }

                    const element =
                        await TrainingModel.findOneAndUpdate(
                            { _id: cleanedTraining._id },
                            cleanedTraining,
                            {
                                upsert: true, // if no details found, create a new entry
                                new: true // return the value of the object after the update and not before
                            }
                        );

                    return element;
                })
            );
            return TrainingWriteResult
                ? TrainingWriteResult
                : false;
        },
        removeTraining: async (
            { id },
            { models: { TrainingModel } },
            info
        ) => {
            const WriteResult = await TrainingModel.remove(
                { _id: id },
                { justOne: true }
            ); // remove just one
            return WriteResult.deletedCount === 1;
        }
    }
};
