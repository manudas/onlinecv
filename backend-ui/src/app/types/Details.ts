export type DetailsType = {
    name: string,
    surname: string,
    address: string,
    // phone_number could be a number but also include digits shuch as + or -
    phone_number: string,
    birth_date: Date, // date
    email: string,
    // qr_code: String, // qr_code will be made on the fly
    keywords: [],
    language: string,
    primaryJobName: string,
    secondaryJobName: string,
    nickname: string
};

export type FetchDetailsPropsType = {
    language: string
}