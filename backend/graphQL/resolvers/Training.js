module.exports = {
    Query: {
        Trainings: async({
            language
        }, {
            models: {
                TrainingModel
            },
        }, info) => {
            const trainingList = await TrainingModel.find({
                language
            }).sort({
                order: 1
            }).exec();
            return trainingList;
        },
    },
    Mutation: {
        /* Example
        db.books.update(
            { item: "ZZZ135" },   // Query parameter
            {                     // Replacement document
                item: "ZZZ135",
                stock: 5,
                tags: [ "database" ]
            },
            { upsert: true }      // Options: upsert -> insert document if no ducment found to update
        )
        */
        putTraining: async(parent, {
            training,
        }, {
            models: {
                TrainingModel
            },
        }, info) => {
            const WriteResult = await TrainingModel.update({
                id: training.id,
            }, training, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Training : false;
        },
        removeTraining: async(parent, {
            id,
        }, {
            models: {
                TrainingModel
            },
        }, info) => {
            const WriteResult = await TrainingModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};