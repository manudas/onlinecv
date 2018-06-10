export const imageSignature = { // magic numbers
    'iVBORw0KGgo' : 'png',
    '/9j/': 'jpeg',
    'R0lGOD' : 'gif'
}

export function getBase64ImageMimeType(base64_image_string){
    let signature_entries = Object.entries(imageSignature);
    for (let index = 0; index < signature_entries.length; index++){
        let current_key_signature = signature_entries[index][0]; // 0 is the key of Object.entries
        let current_signature_mimetype = signature_entries[index][1]; // 1 is the content
        if (base64_image_string.startsWith(current_key_signature)) {
            return 'image/'+current_signature_mimetype;
        }
    }
    return null;
}