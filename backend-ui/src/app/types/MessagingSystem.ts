export type MessageDef = {
    name: string
    from: string
    subject: string
    message: string
    date: number
    hasBeenRead: boolean
    type: 'sent' | 'received'
}