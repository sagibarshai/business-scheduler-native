import {type Asset} from 'react-native-image-picker'

export interface Props {
    variant:"profile" | "cover"| "regular" | "plus-button" 
    source?:Asset 
    onUpload:(assets:Asset[]) => void
    onCancel:() => void
    onError?:() => void
    text:string
    


}