import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from "react-native-image-picker";
import { Props } from "./types";
import { theme } from "../../../theme";
import { StyleCoverImgWrapper, StyleRegularImgWrapper, StyledCoverImg, StyledCoverText, StyledCoverUploadImgWrapper, StyledPlusButtonText, StyledPlusButtonWrapper, StyledProfileImg, StyledProfileImgWrapper, StyledProfileText, StyledProfileUploadImgWrapper, StyledRegularUploadImgWrapper } from "./styled";

const UploadImg = ({ variant, text, source, onUpload, onCancel, onError = () => {} }: Props) => {
  const onUploadImg = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
        onCancel();
      } else if (response.errorCode) {
        console.log("Image picker error: ", response.errorCode);
        onError();
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
              <Icon name="image-outline" color={theme.icons.colors.gray} size={theme.icons.sizes.xl} />
            </StyledProfileImgWrapper>
            <StyledProfileText>{text}</StyledProfileText>
          </>
        ) : (
          <StyledProfileImgWrapper>
            <StyledProfileImg source={source} />
          </StyledProfileImgWrapper>
        )}
      </StyledProfileUploadImgWrapper>
    );
  else if (variant === "plus-button")
    return (
      <StyledPlusButtonWrapper onPress={onUploadImg}>
        <StyledPlusButtonText>+</StyledPlusButtonText>
      </StyledPlusButtonWrapper>
    );
  else if (variant === "regular")
    return (
      <StyledRegularUploadImgWrapper onPress={onUploadImg}>
        {!source ? (
          <>
            <StyleRegularImgWrapper>
              <Icon name="image-outline" color={theme.icons.colors.gray} size={theme.icons.sizes.xl} />
            </StyleRegularImgWrapper>
            <StyledCoverText>{text}</StyledCoverText>
          </>
        ) : (
          <StyleRegularImgWrapper>
            <StyledCoverImg source={source} />
          </StyleRegularImgWrapper>
        )}
      </StyledRegularUploadImgWrapper>
    );
  else
    return (
      <StyledCoverUploadImgWrapper onPress={onUploadImg}>
        {!source ? (
          <>
            <StyleCoverImgWrapper>
              <Icon name="image-outline" color={theme.icons.colors.gray} size={theme.icons.sizes.xl} />
            </StyleCoverImgWrapper>
            <StyledCoverText>{text}</StyledCoverText>
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
