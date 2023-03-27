export type PropDef = {
    name: string
    contact_details: Record<string, string>
    reference: React.Ref<any>,
    language: string,
}

export type StateDef = {
    contactForm: {
        name: string,
        from: string,
        subject: string,
        message: string,
    },
    popupMessage: string | null
}