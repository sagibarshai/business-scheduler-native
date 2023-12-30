import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from "react-native-image-picker";
import { Props } from "./types";
import { theme } from "../../../theme";
import { StyledImg, StyledImgWrapper, StyledText, StyledUploadImgWrapper } from "./styled";

const UploadImg = ({ onUpload, source }: Props) => {
  const onUploadImg = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      console.log("inside this function !! ");
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("Image picker error: ", response.errorCode);
      } else {
        let imageUri = response.assets || response.assets?.[0];
        if (imageUri) {
          onUpload(imageUri);
        }
      }
    });
  };

  return (
    <StyledUploadImgWrapper onPress={onUploadImg}>
      {!source ? (
        <>
          <StyledImgWrapper>
            <Icon name="image-outline" color={theme.icons.colors.black} size={theme.icons.sizes.xl} />
          </StyledImgWrapper>
          <StyledText>הוספת תמונת פרופיל</StyledText>
        </>
      ) : (
        <StyledImgWrapper>
          <StyledImg source={source} />
        </StyledImgWrapper>
      )}
    </StyledUploadImgWrapper>
  );
};
export default UploadImg;
