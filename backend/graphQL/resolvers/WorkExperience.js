export default {
    Query: {
        workExperiences: async(parent, {
            language
        }, {
            models: {
                workExperienceModel
            },
        }, info) => {
            const workExperienceList = await workExperienceModel.findById({
                language
            }).sort({
                order: 1
            }).exec();
            return workExperienceList;
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
        putWorkExperience: async(parent, {
            WorkExperience,
        }, {
            models: {
                workExperienceModel
            },
        }, info) => {
            const WriteResult = await workExperienceModel.update({
                id: WorkExperience.id,
            }, WorkExperience, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? WorkExperience : false;
        },
        removeWorkExperience: async(parent, {
            id,
        }, {
            models: {
                workExperienceModel
            },
        }, info) => {
            const WriteResult = await workExperienceModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};