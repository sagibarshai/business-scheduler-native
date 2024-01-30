 const PHONE_RGX = `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
 const EMAIL_RGX = `/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/`

export const isPhone = (text:string) => Boolean(text.match(PHONE_RGX))
export const isEmail = (text:string) => Boolean(text.match(EMAIL_RGX))