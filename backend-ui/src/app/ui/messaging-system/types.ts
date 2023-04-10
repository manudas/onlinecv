import { SettingsType } from "@app/types"
import { MessageDef } from "@app/types/MessagingSystem"

export type storeDef = {
    messaging: {
        messageTypes: Array<string>
        messages: MessageDef[]
    }
} & {
    settings: { data: SettingsType }
}