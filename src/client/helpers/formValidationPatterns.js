// Regular expression declarations
export const nameRegex = /^[a-z.' ]+$/i;
export const extendedNameRegex = /^[a-z0-9-_/\/.'"@!+?&% ()]+$/i;
export const emailRegex = /^([a-z0-9_.+-]+)@([a-z0-9.-]+)\.([a-z]{2,})$/i;
export const dateRegex = /^(?:(?:31\/(?:0[13578]|1[02]))\/|(?:(?:29|30)\/(?:0[13-9]|1[0-2])\/))(?:(?:19|20)\d{2})$|^(?:29\/02\/(?:(?:(?:19|20)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:19|20)\d{2})$/;
export const colourRegex = /^#(([0-9a-f]){3}){1,2}$/i; // hex colour
export const intRegex = /^\d*$/i; // integer
export const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g; // must contain at least one lowercase, one uppercase and one digit