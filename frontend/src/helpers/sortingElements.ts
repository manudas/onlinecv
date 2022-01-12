type elementType = { type: string; order: number };
export const sortElementsByTypeAndOrder = (
    elements: elementType[],
    types: string[]
): elementType[] => {
    if (!types) return elements;
    const typeObject: Record<string, number> =
        Object.entries(types).reduce(
            (carry, [index, value]) => {
                carry[value] = Number(index);
                return carry;
            },
            {} as Record<string, number>
        );

    return elements.sort(
        (elementA: elementType, elementB: elementType) =>
            typeObject[elementA.type] -
                typeObject[elementB.type] ||
            elementA.order - elementB.order
    );
};
