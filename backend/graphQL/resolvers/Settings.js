const cleanAndMapObject = require('@helpers/utils').cleanAndMapObject;

module.exports = {
    Query: {
        settings: async (
            _parent,
            // 1st arg: arguments
            {
                language,
              },
            // 2nd arg: context
            {
                models: { SettingsModel }
            },
            _info
        ) => {
            const settings = await SettingsModel.findOne({
                language: language
            })
            return settings
        }
    },
    Mutation: {
        putSettings: async (
            _parent,
            // 1st arg: arguments
            {
                settings,
            },
            // 2nd arg: context
            {
                models: { SettingsModel }
            },
            _info
        ) => {
            const cleanedSettings = cleanAndMapObject(settings, {
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
