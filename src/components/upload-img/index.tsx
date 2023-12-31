import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from "react-native-image-picker";
import { Props } from "./types";
import { theme } from "../../../theme";
import { StyleCoverImgWrapper, StyledCoverImg, StyledCoverText, StyledCoverUploadImgWrapper, StyledProfileImg, StyledProfileImgWrapper, StyledProfileText, StyledProfileUploadImgWrapper } from "./styled";

const UploadImg = ({ variant, onUpload, source }: Props) => {
  const onUploadImg = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
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

  if (variant === "profile")
    return (
      <StyledProfileUploadImgWrapper onPress={onUploadImg}>
        {!source ? (
          <>
            <StyledProfileImgWrapper>
              <Icon name="image-outline" color={theme.icons.colors.black} size={theme.icons.sizes.xl} />
            </StyledProfileImgWrapper>
            <StyledProfileText>הוספת תמונת פרופיל</StyledProfileText>
          </>
        ) : (
          <StyledProfileImgWrapper>
            <StyledProfileImg source={source} />
          </StyledProfileImgWrapper>
        )}
      </StyledProfileUploadImgWrapper>
    );
  else
    return (
      <StyledCoverUploadImgWrapper onPress={onUploadImg}>
        {!source ? (
          <>
            <StyledCoverUploadImgWrapper>
              <Icon name="image-outline" color={theme.icons.colors.black} size={theme.icons.sizes.xl} />
            </StyledCoverUploadImgWrapper>
            <StyledCoverText>הוספת תמונת פרופיל</StyledCoverText>
          </>
        ) : (
          <StyleCoverImgWrapper>
            <StyledCoverImg source={source} />
          </StyleCoverImgWrapper>
        )}
      </StyledCoverUploadImgWrapper>
    );
};
export default UploadImg;
