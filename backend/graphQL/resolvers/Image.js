// import { AuthenticationError } from 'apollo-server';
module.exports = {
    Query: {
        image: async({ // 1st arg: arguments
            key
        }, { // 2nd arg: context
            models: {
                ImageModel // configModel
            },
        }, info) => {
            const image = await ImageModel.findOne({
                key: key
            }).exec();
            return image;
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
        putImage: async(parent, {
            Image,
        }, {
            models: {
                imageModel // configModel
            },
        }, info) => {
            const WriteResult = await imageModel.update({
                key: key
            }, { // the object values to insert in DB
                key: Image.key,
                value: Image.value
            }, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Image : false;
        },
        removeImage: async(parent, {
            key,
        }, {
            models: {
                imageModel // configModel
            },
        }, info) => {
            const WriteResult = await imageModel.remove({
                key
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};