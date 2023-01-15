import { Buffer } from 'buffer'

// magic numbers for images and documents
export const imageSignature = {'iVBORw0KGgo' : 'png', '/9j/': ['jpg', 'jpeg'], 'R0lGOD' : 'gif', 'UklGR': 'webp'}
export const documentSignature = {'JVBERi0xLj': 'pdf', 'UEsDBBQACAgIA': 'docx', '0M8R4KGxGuEAAAAAAAAAAAAAAAAAAAAA': 'doc', 'UEsDBBQAAAgAA': 'odt'}
const combinedSignatures = { ...imageSignature, ...documentSignature }

const getBase64ImageExtension = (encodedbase64_file: string) => Object.entries(imageSignature).find(([signature]) => encodedbase64_file.startsWith(signature))?.[1] ?? null
const getBase64DocumentExtension = (encodedbase64_file: string) => Object.entries(documentSignature).find(([signature]) => encodedbase64_file.startsWith(signature))?.[1] ?? null
const isBase64Image = (encodedbase64_file: string) => !!getBase64ImageExtension(removeUrlDataFromBase64(encodedbase64_file))
const isBase64Document = (encodedbase64_file: string) => !!getBase64DocumentExtension(removeUrlDataFromBase64(encodedbase64_file))
const attachUrlDataTypeToBase64 = (encodedbase64_file: string) => `data:${getBase64MimeType(encodedbase64_file)};base64,${encodedbase64_file}`

export const getBase64MimeType = (encodedbase64_file: string) => {
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

const removeUrlDataFromBase64 = (encodedbase64_file: string) => encodedbase64_file.replace(/^data:[a-z]+\/[a-z\.\-]+;base64,/i , "")
export function getMainExtension(encodedbase64_file: string) {
    const data = removeUrlDataFromBase64(encodedbase64_file)
    const extensions = Object.entries(combinedSignatures).find(([signature]) => data.startsWith(signature))?.[1] ?? null

    return Array.isArray(extensions) ? extensions[0] : extensions
}

export function bufferToBase64(buffer: Buffer | String) {
	/* Data base may have returned a base64 string,
	 * so no need to convert it here. Check for it
	 * and return either the orignal string o the
	 * buffer string conversion
	 */
	let result = null;
	if (Buffer.isBuffer(buffer)) {
		result = Buffer.from(buffer).toString('base64');
	} else if (typeof buffer === 'string' || buffer instanceof String) {
		result = buffer;
	}
	return result;
}

export function downloadDocument(data: string, fileName: string) {
    const downloadLink = document.createElement('a')
    const extension = getMainExtension(data)

    downloadLink.href = attachUrlDataTypeToBase64(data)
    downloadLink.download = `${fileName}${extension ? '.' + extension : ''}`
    downloadLink.click();
}