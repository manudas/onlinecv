type elementType = { type: string; order: number };
export const sortElementsByTypeAndOrder = (
    elements: elementType[],
    types: string[]
): elementType[] => {
    let typeObject: Record<string, number>
    if (types) {
        typeObject =
            Object.entries(types).reduce(
                (carry, [index, value]) => {
                    carry[value] = Number(index);
                    return carry;
                },
                {} as Record<string, number>
            )
    }

    return elements.sort(
        (elementA: elementType, elementB: elementType) =>
            // if no typeObject or equal type, we order by element.order
            (typeObject && ((typeObject[elementA.type] ?? 0) - (typeObject[elementB.type] ?? 0)))
            // if no order propety and no typeObject, all te elements are considered equal
            || ((elementA.order ?? 0) - (elementB.order ?? 0))
    );
};

export const clasifyByType = (
    elements: elementType[],
    types: string[]
): Record<string, elementType[]> => {
    const sortedElements = sortElementsByTypeAndOrder(elements, types)
    const result: Record<string, elementType[]> = {}
    sortedElements.forEach(element => {
        const type = element.type ?? 'noType'
        result[type] = result[type] ?? []
        result[type].push(element)
    });

    return result;
}