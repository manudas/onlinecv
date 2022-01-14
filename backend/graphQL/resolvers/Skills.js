const ObjectId = require('mongodb').ObjectId;
const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        skills: async (
            { language, type },
            { models: { SkillsModel } },
            info
        ) => {
            const skillList = await SkillsModel.find({
                language,
                ...(type ? { type } : {})
            })
                .sort({
                    order: 1
                })
                .exec();
            return skillList;
        }
    },
    Mutation: {
        putSkills: async (
            { skills },
            { models: { SkillsModel } },
            info
        ) => {
            const WriteResult = await Promise.all(
                skills.map(async (skill) => {
                    const cleanedSkill = cleanObject(
                        skill,
                        { id: '_id' }
                    );

                    if (!cleanedSkill._id) {
                        cleanedSkill._id = new ObjectId();
                    }

                    const element =
                        await SkillsModel.findOneAndUpdate(
                            { _id: cleanedSkill._id },
                            cleanedSkill,
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
        removeSkill: async (
            parent,
            { id },
            { models: { skillsModel } },
            info
        ) => {
            const WriteResult = await skillsModel.remove(
                {
                    id
                },
                true
            ); // true == remove one
            return WriteResult.nRemoved === 1;
        }
    }
};
