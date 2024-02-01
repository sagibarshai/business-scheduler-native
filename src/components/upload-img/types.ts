import {type Asset} from 'react-native-image-picker'

export interface Props {
    variant:"profile" | "cover"| "regular" | "plus-button" 
    source?:Asset 
    onUpload:(assets:Asset[]) => void
    onDelete?:() => void
    onError?:() => void
    onCancel?:() => void
    text:string
    error?:string
}