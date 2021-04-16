

// function promisedProperties(object) {
//     let promisedProperties = [];
//     const objectKeys = Object.keys(object);
//     objectKeys.forEach((key) => promisedProperties.push(object[key]));
//     return Promise.all(promisedProperties)
//         .then((resolvedValues) => {
//             return resolvedValues.reduce((resolvedObject, property, index) => {
//                 resolvedObject[objectKeys[index]] = property;
//                 return resolvedObject;
//             }, object); // mutable object, if we want a copy, use {} or new Object() instead
//         });
// }

const resolvedObjectPromises = async (object = {}) => {
    const keys = Object.keys(object);
    return (await Promise.all(Object.values(object))).reduce((previous, current, index) => ({...previous, [keys[index]]: current}), {});
};

const cleanObject = (object, keyMapping) => Object.entries(object).reduce((prev, [currKey, currVal]) => {
    currVal !== null && (prev[keyMapping[currKey] ? keyMapping[currKey] : currKey] = currVal);
    return prev;
}, {});


module.exports = {
    resolvedObjectPromises,
    cleanObject
}