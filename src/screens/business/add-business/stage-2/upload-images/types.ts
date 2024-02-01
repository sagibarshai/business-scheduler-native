import { Asset } from "react-native-image-picker"

export interface Props {
    onUploadCoverImg:(asset:Asset) => void
    onUploadProfileImg:(asset:Asset) => void
    onUploadRegularImg:(asset:Asset) => void
    onDeleteRegularImg:(index:number) => void
    onDeleteCoverImg:() => void
    profileImg:Asset | undefined
    coverImg:Asset | undefined
    regularImgs:Asset[]
    profileImgErrorMessage?:string
    onCancelProfileImg?:() => void
}
