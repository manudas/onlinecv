import nodemailer from "nodemailer";

export default {
    Query: {
        getMessageTypes: () => {
            return [
                'received',
                'sent',
                'new'
            ]
        }
    },
    Mutation: {
        receiveMessage: async (
            _parent,
            // 1st arg: arguments
            {
                message: {
                  from,
                  name,
                  subject,
                  message
                },
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
                        name,
                        subject,
                        message,
                        date: Date.now(),
                        hasBeenRead: false,
                        type: 'received'
                    }
                );
                document.save(); // makes it sense to await here?

                if (sendToEmail) {
                    const transporter = nodemailer.createTransport({
                        host: appSettings.smtpServer,
                        port: appSettings.smtpPort,
                        auth: {
                        user: appSettings.smtpUsername, // generated ethereal user
                        pass: appSettings.smtpPassword, // generated ethereal password
                        },
                        tls: {
                            rejectUnauthorized: false
                        },
                    })

                    // send mail with defined transport object
                    transporter.sendMail({  // makes it sense to await here?
                        from: `"Online CV App 👻" <${appSettings.messagingEmail}>`, // sender address
                        replyTo: `${name} <${from}>`, // to avoid "this email is not authorized" message
                        to: appSettings.messagingEmail, // list of receivers string separated by comma
                        subject: `${subject} ✔`, // Subject line
                        text: message, // plain text body
                    });
                }
                return true;
            }
            return false;
        },
    }
};
