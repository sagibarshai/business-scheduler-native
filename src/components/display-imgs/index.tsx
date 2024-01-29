import { Image, ScrollView } from "react-native";
import { StyleCoverImgWrapper, StyleRegularImgWrapper, StyledCol, StyledCoverImg, StyledProfileImg, StyledProfileImgWrapper, StyledRow, StyledRowCoverAndProfileImgsWrapper, StyledWrapper, StyledProfileUploadImgWrapper } from "./styled";
import { Props } from "./types";

const DisplayImgs = ({ profileImg, coverImg, regularImgs }: Props) => {
  return (
    <StyledWrapper>
      <StyledRowCoverAndProfileImgsWrapper>
        <StyleCoverImgWrapper>
          <StyledCoverImg source={coverImg} />
        </StyleCoverImgWrapper>
        <StyledProfileImgWrapper>
          <StyledProfileImg source={profileImg} />
        </StyledProfileImgWrapper>
      </StyledRowCoverAndProfileImgsWrapper>
      <StyledRow>
        <ScrollView horizontal>
          <StyledCol>
            <StyledRow>
              {regularImgs.map((source, index) => (
                <StyleRegularImgWrapper key={index}>
                  <StyledCoverImg source={source} />
                </StyleRegularImgWrapper>
              ))}
            </StyledRow>
          </StyledCol>
        </ScrollView>
      </StyledRow>
    </StyledWrapper>
  );
};
export default DisplayImgs;
