module.exports = {
    Query: {
        resume: async(parent, {
            language
        }, {
            models: {
                resumeModel
            },
        }, info) => {
            const resume = await resumeModel.findById({
                language
            }).exec();
            return resume;
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
        putResume: async(parent, {
            Resume,
        }, {
            models: {
                resumeModel
            },
        }, info) => {
            const WriteResult = await resumeModel.update({
                id: Resume.id,
            }, Resume, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Resume : false;
        },
        removeResume: async(parent, {
            id,
        }, {
            models: {
                resumeModel
            },
        }, info) => {
            const WriteResult = await resumeModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};