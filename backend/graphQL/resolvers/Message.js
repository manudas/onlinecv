const nodemailer = require("nodemailer")

module.exports = {
    Mutation: {
        sendMessage: async (
            // 1st arg: arguments
            {
                message: {
                  from,
                  name,
                  subject,
                  message
                }
              },
            // 2nd arg: context
            {
                models: {
                    SettingsModel,
                }
            },
            info
        ) => {

            console.log("TOMAR EL LENGUAJE DE OTRO LADO!!!")
            const appSettings = await SettingsModel.findOne({
                language: 'en'
            })

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
            const emailInfo = await transporter.sendMail({
                from: `"Online CV App 👻" <${appSettings.messagingEmail}>`, // sender address
                replyTo: `${name} <${from}>`, // to avoid "this email is not authorized" message
                to: appSettings.messagingEmail, // list of receivers string separated by comma
                subject: `${subject} ✔`, // Subject line
                text: message, // plain text body
            });

            return true
        }
    }
}
