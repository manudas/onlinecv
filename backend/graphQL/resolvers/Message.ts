module.exports = {
    Mutation: {
        sendMessage: (
            // 1st arg: arguments
            {
                message: {
                  from,
                  name,
                  subject,
                  email,
                  message
                }
              },
            // 2nd arg: context
            context,
            info
        ) => {
            console.log(from, name, email, subject, message)
            return true
        }
    }
}
