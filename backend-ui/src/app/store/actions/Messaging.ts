import { MessageDef } from "@app/types/MessagingSystem"
import { createAction, props } from "@ngrx/store"

export const GET_MESSAGING_TYPES = createAction(
    '[Messaging Action] Get message types',
)
export const MESSAGING_TYPES_FETCHED = createAction(
    '[Messaging Action] Get message types FETCHED',
    props<{messageTypes: string[]}>()
)
export const GET_MESSAGES = createAction(
    '[Messaging Action] Get messages by type',
    props<{
        messageType: string,
    }>()
)
export const GET_MESSAGES_FETCHED = createAction(
    '[Messaging Action] Get messages by type FETCHED',
    props<{
        messages: MessageDef[],
    }>()
)
export const DELETE_MESSAGE = createAction(
    '[Messaging Action] Remove message',
    props<{
        id: string | string[]
        currentMessageType: string
    }>()
)
export const SEND_MESSAGE = createAction(
    '[Messaging Action] Send message',
    props<{
        message: MessageDef,
        language: string,
        currentMessageType: string
    }>()
)