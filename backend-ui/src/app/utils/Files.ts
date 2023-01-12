export const imageSignature = {'iVBORw0KGgo' : 'png', '/9j/': ['jpg', 'jpeg'], 'R0lGOD' : 'gif', 'UklGR': 'webp'}
export const documentSignature = {'JVBERi0xLj': 'pdf', 'UEsDBBQACAgIA': 'docx', '0M8R4KGxGuEAAAAAAAAAAAAAAAAAAAAA': 'doc', 'UEsDBBQAAAgAA': 'odt'}

export const combinedSignatures = { ...imageSignature, ...documentSignature }

export const getBase64ImageExtension = (encodedbase64_file) => Object.entries(imageSignature).find(([signature]) => encodedbase64_file.startsWith(signature))?.[1] ?? null
export const getBase64DocumentExtension = (encodedbase64_file) => Object.entries(documentSignature).find(([signature]) => encodedbase64_file.startsWith(signature))?.[1] ?? null
export const removeUrlDataFromBase64 = (encodedbase64_file) => encodedbase64_file.replace(/^data:[a-z]+\/[a-z\.\-]+;base64,/i , "")
export const attachUrlDataTypeToBase64 = (encodedbase64_file) => `data:${getMimeType(encodedbase64_file)};base64,${encodedbase64_file}`

export const isBase64Image = (encodedbase64_file) => !!getBase64ImageExtension(removeUrlDataFromBase64(encodedbase64_file))
export const isBase64Document = (encodedbase64_file) => !!getBase64DocumentExtension(removeUrlDataFromBase64(encodedbase64_file))

export function getMainExtension(encodedbase64_file: string) {
    const data = removeUrlDataFromBase64(encodedbase64_file)
    const extensions = Object.entries(combinedSignatures).find(([signature]) => data.startsWith(signature))?.[1] ?? null

    return Array.isArray(extensions) ? extensions[0] : extensions
}


export const getMimeType = (encodedbase64_file: string) => {
    const extension = getMainExtension(encodedbase64_file)
    if (isBase64Image(encodedbase64_file)) {
        return `image/${extension}`
    } else if (isBase64Document(encodedbase64_file)) {
        switch (extension) {
            case 'pdf':
                return `application/${extension}`
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            case 'doc':
                return 'application/msword'
            case 'odt':
                return 'application/vnd.oasis.opendocument.text'
        }
    }
    return null
}

/**
 * Add the signature to add a new accepted file
 * Used for Fileupload component accept input
 */
export const acceptedFileType = {
    image: Object.values(imageSignature).flat(),
    document: Object.values(documentSignature).flat()
}

export const definedFileTypes = Object.keys(acceptedFileType).reduce((acc, val) => {
    acc[val] = val
    return acc
}, {} as Record<keyof typeof acceptedFileType, keyof typeof acceptedFileType>)
