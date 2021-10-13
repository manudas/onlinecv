const ObjectId = require('mongodb').ObjectId;
const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        Experiences: async({
            language,
            type
        }, {
            models: {
                WorkExperienceModel
            },
        }, info) => {
            const workExperienceList = await WorkExperienceModel.find({
                language,
                type
            }).sort({
                order: 1
            }).exec();
            return workExperienceList;
        },
        allExperiences: async({
            language,
        }, {
            models: {
                WorkExperienceModel
            },
        }, info) => {
            const workExperienceList = await WorkExperienceModel.find({
                language,
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
        putWorkExperience: async({
            workExperiences,
        }, {
            models: {
                WorkExperienceModel
            },
        }, info) => {


            const WriteResult = await Promise.all(workExperiences.map(async experience => {

                const cleanedObject = cleanObject(experience, {'id': '_id'});

                if (!cleanedObject._id) {
                    cleanedObject._id = new ObjectId();
                }

                const element = await WorkExperienceModel.findOneAndUpdate(
                    {_id: cleanedObject._id}
                ,
                cleanedObject, {
                    upsert: true, // if no details found, create a new entry
                    new: true // return the value of the object after the update and not before
                });

                return element;
            }));
            return WriteResult? WriteResult : false;
        },
        removeWorkExperience: async({
            id,
        }, {
            models: {
                WorkExperienceModel
            },
        }, info) => {
            const WriteResult = await WorkExperienceModel.remove({ _id: id }, { justOne: true }); // remove just one
            return WriteResult.deletedCount === 1;
        },
    },
};