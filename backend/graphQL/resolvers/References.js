const ObjectId = require('mongodb').ObjectId;
const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        references: async (
            _parent,
            { language },
            { models: { ReferenceModel } },
            _info
        ) => {
            const referenceList = await ReferenceModel.find({
                    language,
                }).sort({
                    order: 1
                }).exec();
            return referenceList;
        },
    },
    Mutation: {
        putReferences: async (
            _parent,
            { references },
            { models: { ReferenceModel } },
            _info
        ) => {
            const WriteResult = await Promise.all(
                references.map(async (reference) => {
                    const cleanedObject = cleanObject(
                        reference,
                        {
                            id: '_id'
                        }
                    );

                    if (!cleanedObject._id) {
                        cleanedObject._id = new ObjectId();
                    }

                    const element =
                        await ReferenceModel.findOneAndReplace(
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
        removeReference: async (
            _parent,
            { id },
            { models: { ReferenceModel } },
            _info
        ) => {
            const WriteResult =
                await ReferenceModel.remove(
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
