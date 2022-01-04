module.exports = {
    Query: {
        resume: async (
            { language },
            { models: { ResumeModel } },
            info
        ) => {
            const resume = await ResumeModel.findOne({
                language
            }).exec();
            return resume;
        }
    },
    Mutation: {
        putResume: async (
            parent,
            { Resume },
            { models: { resumeModel } },
            info
        ) => {
            const WriteResult = await resumeModel.update(
                {
                    id: Resume.id
                },
                Resume,
                {
                    upsert: true // if no details found, create a new entry
                }
            );
            return WriteResult.nUpserted === 1 ||
                WriteResult.nModified === 1
                ? Resume
                : false;
        },
        removeResume: async (
            parent,
            { id },
            { models: { resumeModel } },
            info
        ) => {
            const WriteResult = await resumeModel.remove(
                {
                    id
                },
                true
            ); // true == remove one
            return WriteResult.nRemoved === 1;
        }
    }
};
