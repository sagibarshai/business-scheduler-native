 const PHONE_RGX = `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`

export const isPhone = (text:string) => Boolean(text.match(PHONE_RGX))