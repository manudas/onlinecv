import { ComponentDef } from "helpers/types"

export type PropDef = {
    details: {
        name: string,
        surname: string,
        primaryJobName: string,
        secondaryJobName: string,
    },
    resumeEncodedData: {
        data: string
    },
    language: string,
    onComponentClick: Function,
}


export type StateDef = {
    previousMenuState: 'opened' | 'closed',
    menu: 'opened' | 'closed',
    componentRefs: ComponentDef[],
}
