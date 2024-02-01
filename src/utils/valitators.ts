 const PHONE_RGX = `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
 const EMAIL_RGX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export const isPhone = (text:string) => Boolean(text.match(PHONE_RGX))
export const isEmail = (text:string) => {
   return Boolean(text.match(EMAIL_RGX))
}