export const imageSignature = {'iVBORw0KGgo' : 'png', '/9j/': 'jpeg', 'R0lGOD' : 'gif'}
export const getBase64ImageMimeType = (base64_image_string) => Object.entries(imageSignature).find(([signature]) => base64_image_string.startsWith(signature))[1] ?? null
export const removeUrlDataFromBase64 = (base64_image_string) => base64_image_string.replace(/data:image\/[a-z]+;base64,/i , "")
export const attachUrlDataTypeToBase64 = (base64_image_string) => `data:image/${getBase64ImageMimeType(base64_image_string)};base64,${base64_image_string}`