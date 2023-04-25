import nodemailer from "nodemailer";
import { GraphQLError } from 'graphql';

const messageTypesMap = new Map([
    ['received', 'inbox'],
    ['sent', 'outbox'],
    ['new', 'unread'],
])

export default {
    Query: {
        getMessageTypes: () => {
            return messageTypesMap.values()
        },
        messages: async (
            _parent,
            { type },
            { models: { MessagesModel } },
            _info
        ) => {
            const messageList = await MessagesModel.find({ type })
                .sort({
                    date: 1
                })
                .exec();

           return messageList;
        }
    },
    Mutation: {
        sendMessage: async (
            _parent,
            // 1st arg: arguments
            {
                message: {
                  from,
                  to,
                  name,
                  subject,
                  message
                },
                receiving = false,
                language
              },
            // 2nd arg: context
            {
                models: {
                    MessagesModel,
                    SettingsModel,
                }
            },
            _info
        ) => {
            const appSettings = await SettingsModel.findOne({
                language
            });

            const { enabledMessaging = true, sendToEmail = false } = appSettings || {};

            if (enabledMessaging) {

                const document = new MessagesModel(
                    {
                        from,
                        to: receiving ? appSettings.messagingEmail : to,
                        name,
                        subject,
                        message,
                        date: Date.now(),
                        hasBeenRead: false,
                        type: receiving ? messageTypesMap.get('received') : messageTypesMap.get('sent')
                    }
                );
                document.save();

                if (sendToEmail) {
                    const transporter = nodemailer.createTransport({
                        host: appSettings.smtpServer,
                        port: appSettings.smtpPort,
                        auth: {
                        user: appSettings.smtpUsername,                                             // generated ethereal user
                        pass: appSettings.smtpPassword,                                             // generated ethereal password
                        },
                        tls: {
                            rejectUnauthorized: false
                        },
                    })

                    try {
                        // send mail with defined transport object
                        await transporter.sendMail({
                            from: `"Online CV App 👻" <${appSettings.messagingEmail}>`,                 // sender address
                            replyTo: `${name} <${!receiving ? appSettings.messagingEmail : from}>`,     // to avoid "this email is not authorized" message
                            to: receiving ? appSettings.messagingEmail : to,                            // list of receivers string separated by comma
                            subject: `${subject} ✔`,                                                    // Subject line
                            text: message,                                                              // plain text body
                        });
                    } catch (error) {
                        throw new GraphQLError(`Could not send external email: ${error}`);
                    }
                }
                return true;
            }
            return false;
        },
        deleteMessages: async (
            _parent,
            { id },
            { models: { MessagesModel } },
            _info
        ) => {
            const WriteResult = await MessagesModel.deleteMany({ _id: { $in: id } });
            return WriteResult.deletedCount > 1;
        }
    }
};
