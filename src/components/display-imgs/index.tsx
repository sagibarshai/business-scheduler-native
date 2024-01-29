import { Image, ScrollView } from "react-native";
import { StyleCoverImgWrapper, StyleRegularImgWrapper, StyledCol, StyledCoverImg, StyledProfileImg, StyledProfileImgWrapper, StyledRow, StyledRowCoverAndProfileImgsWrapper, StyledWrapper, StyledProfileUploadImgWrapper } from "./styled";
import { Props } from "./types";

const DisplayImgs = ({ profileImg, coverImg, regularImgs }: Props) => {
  return (
    <StyledWrapper>
      {(coverImg || profileImg) && (
        <StyledRowCoverAndProfileImgsWrapper>
          {coverImg && (
            <StyleCoverImgWrapper>
              <StyledCoverImg source={coverImg} />
            </StyleCoverImgWrapper>
          )}
          {profileImg && (
            <StyledProfileImgWrapper>
              <StyledProfileImg source={profileImg} />
            </StyledProfileImgWrapper>
          )}
        </StyledRowCoverAndProfileImgsWrapper>
      )}
      {regularImgs && (
        <StyledRow margin={coverImg || profileImg ? true : false}>
          <ScrollView horizontal>
            <StyledCol>
              <StyledRow margin={coverImg || profileImg ? true : false}>
                {regularImgs.map((source, index) => (
                  <StyleRegularImgWrapper key={index}>
                    <StyledCoverImg source={source} />
                  </StyleRegularImgWrapper>
                ))}
              </StyledRow>
            </StyledCol>
          </ScrollView>
        </StyledRow>
      )}
    </StyledWrapper>
  );
};
export default DisplayImgs;
