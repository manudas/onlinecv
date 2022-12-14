const {
    Schema,
    model,
} = require('mongoose');

const collection = 'settings';

const SettingsSchema = new Schema({
    backgroundImage: Schema.Types.Buffer,
    sendToEmail: Boolean,
    smtpServer: String,
    smtpPort: Number,
    smtpUsername: String,
    smtpPassword: String,
    messagingEmail: String,
    language: String,
}, {
    collection,
    versionKey: false
});

const SettingsModel = model(collection, SettingsSchema);

module.exports = {
    SettingsSchema,
    SettingsModel,
};