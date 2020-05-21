export default {
    Query: {
        skills: async(parent, {
            language
        }, {
            models: {
                skillsModel
            },
        }, info) => {
            const skillList = await skillsModel.findById({
                language
            }).sort({
                order: 1
            }).exec();
            return skillList;
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
        putSkill: async(parent, {
            Skill,
        }, {
            models: {
                skillsModel
            },
        }, info) => {
            const WriteResult = await skillsModel.update({
                id: Skill.id,
            }, Skill, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Skill : false;
        },
        removeSkill: async(parent, {
            id,
        }, {
            models: {
                skillsModel
            },
        }, info) => {
            const WriteResult = await skillsModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};