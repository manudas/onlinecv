export default {
    Query: {
        regulatedTrainings: async(parent, {
            language
        }, {
            models: {
                regulatedTrainingModel
            },
        }, info) => {
            const regulatedTrainingList = await regulatedTrainingModel.findById({
                language
            }).sort({
                order: 1
            }).exec();
            return regulatedTrainingList;
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
        putRegulatedTraining: async(parent, {
            RegulatedTraining,
        }, {
            models: {
                regulatedTrainingModel
            },
        }, info) => {
            const WriteResult = await regulatedTrainingModel.update({
                id: RegulatedTraining.id,
            }, RegulatedTraining, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? RegulatedTraining : false;
        },
        removeRegulatedTraining: async(parent, {
            id,
        }, {
            models: {
                regulatedTrainingModel
            },
        }, info) => {
            const WriteResult = await regulatedTrainingModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};