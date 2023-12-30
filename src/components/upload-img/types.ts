import {type Asset} from 'react-native-image-picker'

export interface Props {
    onUpload:(assets:Asset[]) => void
    source?:Asset 
}