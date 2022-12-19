const cleanObject = (object, keyMapping) => Object.entries(object).reduce((prev, [currKey, currVal]) => {
    currVal !== null && (prev[keyMapping[currKey] ? keyMapping[currKey] : currKey] = currVal);
    return prev;
}, {});

const findAndUpdateMany = (model, filter, updateOptions) => {
    return model.aggregate([
        { $match: filter },
        { $project: {_id: 1} }
    ]).then(function(matchingIds) {
            filter = {_id: {$in: matchingIds}}
            return model.updateMany(filter, updateOptions)
        }).then(function() {
            return model.find(filter)
        })
}

module.exports = {
    findAndUpdateMany,
    cleanObject
}