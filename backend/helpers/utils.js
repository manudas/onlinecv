const cleanAndMapObject = (object, keyMapping) => Object.fromEntries(Object.entries(cleanObject(object)).map(([key, value]) => [keyMapping[key] ?? key, value] ))

const isObj = o => o?.constructor === Object

const cleanObject = (obj) => {
    const result = {}
    Object.entries(obj).forEach(([key, element]) => {
        if (Array.isArray(element)) {
            const filteredElement = cleanArray(element)
            if (filteredElement.length) {
                result[key] = filteredElement
            }
        } else if (isObj(element)) {
            const filteredElement = cleanObject(element)
            if (Object.values(filteredElement).length) {
                result[key] = filteredElement
            }
        } else if (element != null) { // primitive, accepts 0
            result[key] = element
        }
    })

    return result
}

const cleanArray = a => {
    const result = []
        a.filter(element => {
        if (Array.isArray(element)) {
            const filteredElement = cleanArray(element)
            if (filteredElement.length) {
                result.push(filteredElement)
            }
        } else if (isObj(element)) {
            const filteredElement = cleanObject(element)
            if (Object.values(filteredElement).length) {
                result.push(filteredElement)
            }
        } else if (element != null) { // primitive, accepts 0
            result.push(element)
        }
    })

    return result
}

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
    cleanAndMapObject,
}