export type Language = {
    name: string,
    certification: string,
    school: string,
    school_url: string,
    written_level: number,
    spoken_level: number,
    language: string,
    order: number
}

export type PropDef = {
    name: string                // module name
    language: string            // current webpage language
    languages: Language[]       // list of languages listed as skills
    reference: React.Ref<any>   // reference to module, used to link to other modules
    translations: string[]      // module translations
}