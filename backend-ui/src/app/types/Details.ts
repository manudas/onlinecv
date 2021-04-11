export type DetailsType = {
    name: string,
    surname: string,
    address: string,
    // phone_number could be a number but also include digits shuch as + or -
    number: string,
    birthInfo: String, // date && born city
    email: string,
    // qr_code: String, // qr_code will be made on the fly
    keywords: [],
    language: string,
    primaryRole: string,
    secondaryRole: string,
    nickname: string
};

export type FetchDetailsPropsType = {
    language: string
}

export type DetailsFetched = {
    details: DetailsType
}