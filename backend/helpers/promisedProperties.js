
function promisedProperties(object) {
    let promisedProperties = [];
    const objectKeys = Object.keys(object);
    objectKeys.forEach((key) => promisedProperties.push(object[key]));
    return Promise.all(promisedProperties)
        .then((resolvedValues) => {
            return resolvedValues.reduce((resolvedObject, property, index) => {
                resolvedObject[objectKeys[index]] = property;
                return resolvedObject;
            }, object); // mutable object, if we want a copy, use {} or new Object() instead
        });
}

module.exports = promisedProperties;