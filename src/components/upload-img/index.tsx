import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import { Props } from "./types";
import { theme } from "../../../theme";
import {
  StyleCoverImgWrapper,
  StyleRegularImgWrapper,
  StyledCoverImg,
  StyledCoverText,
  StyledCoverUploadImgWrapper,
  StyledErrorMessageText,
  StyledProfileImg,
  StyledProfileImgWrapper,
  StyledProfileText,
  StyledProfileUploadImgWrapper,
  StyledRegularUploadImgWrapper,
  StyledXButtonText,
  StyledXButtonWrapper,
} from "./styled";
import React from "react";
import PlusButton from "../inputs/buttons/plus-button";

const UploadImg = ({
  variant,
  error,
  text,
  source,
  onUpload,
  onDelete,
  onCancel = () => {},
  onError = () => {},
}: Props) => {
  const onUploadImg = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        onCancel();
      } else if (response.errorCode) {
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
              <Icon
                name="image-outline"
                color={theme.icons.colors.gray}
                size={theme.icons.sizes.xl}
              />
            </StyledProfileImgWrapper>
            {error ? (
              <StyledErrorMessageText>{error}</StyledErrorMessageText>
            ) : (
              <StyledProfileText>{text}</StyledProfileText>
            )}
          </>
        ) : (
          <StyledProfileImgWrapper>
            <StyledProfileImg source={source} />
          </StyledProfileImgWrapper>
        )}
      </StyledProfileUploadImgWrapper>
    );
  else if (variant === "plus-button") return <PlusButton onPress={onUploadImg} />;
  else if (variant === "regular")
    return (
      <StyledRegularUploadImgWrapper onPress={onUploadImg}>
        {!source ? (
          <>
            <StyleRegularImgWrapper>
              <Icon
                name="image-outline"
                color={theme.icons.colors.gray}
                size={theme.icons.sizes.xl}
              />
            </StyleRegularImgWrapper>
            <StyledCoverText>{text}</StyledCoverText>
          </>
        ) : (
          <StyleRegularImgWrapper>
            <StyledXButtonWrapper onPress={onDelete}>
              <Icon
                name="trash-can-outline"
                color={theme.icons.colors.black}
                size={theme.icons.sizes.m}
              />
            </StyledXButtonWrapper>
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
              <Icon
                name="image-outline"
                color={theme.icons.colors.gray}
                size={theme.icons.sizes.xl}
              />
            </StyleCoverImgWrapper>
            <StyledCoverText>{text}</StyledCoverText>
          </>
        ) : (
          <StyleCoverImgWrapper>
            <StyledXButtonWrapper onPress={onDelete}>
              <Icon
                name="trash-can-outline"
                color={theme.icons.colors.black}
                size={theme.icons.sizes.m}
              />
            </StyledXButtonWrapper>
            <StyledCoverImg source={source} />
          </StyleCoverImgWrapper>
        )}
      </StyledCoverUploadImgWrapper>
    );
};
export default UploadImg;
