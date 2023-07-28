import {
    Schema,
    model,
} from 'mongoose';

const collection = 'settings';

const SettingsSchema = new Schema({
    enabledMessaging: Boolean,
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

export {
    SettingsSchema,
    SettingsModel,
};