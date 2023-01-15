module.exports = {
    Query: {
        resume: async (
            { language },
            { models: { ResumeModel } },
            info
        ) => {
            const resume = await ResumeModel.findOne({
                language
            }).lean().exec();
            if (resume) resume.data = resume?.data.toString();

            return resume;
        }
    },
    Mutation: {
        putResume: async (
            { resume },
            { models: { ResumeModel } },
            info
        ) => {
            const WriteResult = await ResumeModel.update(
                {
                    language: resume.language // only one resume per language
                },
                resume,
                {
                    upsert: true, // if no details found, create a new entry,
                }
            );
            return WriteResult.modifiedCount === 1 ||
                WriteResult.upsertedCount === 1
                ? true
                : false;
        },
        removeResume: async (
            { language },
            { models: { ResumeModel } },
            info
        ) => {
            const WriteResult = await ResumeModel.remove(
                {
                    language
                },
                {
                    justOne: true // true == remove one
                }
            );
            return WriteResult.deletedCount === 1;
        }
    }
};
