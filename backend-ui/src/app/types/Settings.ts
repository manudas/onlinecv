export type SettingsType = {
    backgroundImage: Blob
    sendToEmail: boolean
    smtpServer: string
    smtpPort: number
    smtpUsername: string
    smtpPassword: string
    messagingEmail: string
}

export type FetchSettingsPropsType = {
    language: string
}

export type SettingsFetched = {
    settings: SettingsType
}