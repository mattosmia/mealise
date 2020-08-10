export const requiredMsg = fieldName => `${fieldName} is required`;
export const minLengthMsg = (fieldName, minLength) => `${fieldName} must be at least ${minLength} characters long`;

// Regular expression declarations
export const nameRegex = /^[a-z.' ]+$/i;
export const nameRegexMsg = fieldName => `${fieldName} can only contain: letters, spaces, full stops and apostrophes`;

export const dateRegex = /^(?:(?:31\/(?:0[13578]|1[02]))\/|(?:(?:29|30)\/(?:0[13-9]|1[0-2])\/))(?:(?:19|20)\d{2})$|^(?:29\/02\/(?:(?:(?:19|20)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:19|20)\d{2})$/;
export const dateRegexMsg = fieldName => `${fieldName} must be a valid date`;

export const extendedNameRegex = /^[a-z0-9-_/\\.'"@!+?&% ()\[\]:;]+$/i;
export const extendedNameRegexMsg = fieldName => `${fieldName} can only contain: letters, digits, spaces and the following special charaters: - _ / \\ . ' " @ ! + ? & % ( ) [ ] : ;`;

export const emailRegex = /^([a-z0-9_.+-]+)@([a-z0-9.-]+)\.([a-z]{2,})$/i;
export const emailRegexMsg = fieldName => `${fieldName} must be a valid email address`;

export const colourRegex = /^#(([0-9a-f]){3}){1,2}$/i; // hex colour
export const colourRegexMsg = fieldName => `${fieldName} must be a valid hex code, e.g. #000000`;

export const intRegex = /^\d*$/; // integer
export const intRegexMsg = fieldName => `${fieldName} can only contain digits`;

export const objectIdRegex = /^[a-z\d]*$/; // object id
export const objectIdRegexMsg = fieldName => `${fieldName} is invalid`;

export const floatRegex = /^(\d+|\d*\.\d{0,3})$/; // float - 3 decimal places max
export const floatRegexMsg = fieldName => `${fieldName} can only contain numbers with up to 3 decimal places`;

export const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g; // must contain at least one lowercase, one uppercase and one digit
export const passwordRegexMsg = () => `Password must contain at least one lowercase letter, one uppercase letter and one digit`;