import { LocaleStore, SettingsType } from "@app/types"
import { MessageDef } from "@app/types/MessagingSystem"

export type messagingStoreDef = {
    messaging: {
        messageTypes: Array<string>
        messages: MessageDef[]
    }
}

export type storeDef =
{
    locale: LocaleStore
} & messagingStoreDef & {
    settings: { data: SettingsType }
}

