const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Queryu: {
        settings: async (
            // 1st arg: arguments
            {
                language,
              },
            // 2nd arg: context
            {
                models: { SettingsModel }
            },
            info
        ) => {
            const settings = await SettingsModel.findOne({
                language: language
            })
            return settings
        }
    },
    Mutation: {
        putSettings: async (
            // 1st arg: arguments
            {
                settings,
            },
            // 2nd arg: context
            {
                models: { SettingsModel }
            },
            info
        ) => {
            const cleanedSettings = cleanObject(settings, {
                id: '_id'
            });
            const SettingsRemovalResult =
                await SettingsModel.remove(
                    { language: cleanedSettings.language },
                    { justOne: true }
                );
            const document = new SettingsModel(
                cleanedSettings
            );
            const SettingsWriteResult =
                await document.save();

            return SettingsWriteResult ? true : false;
        }
    }
}
