import Progressbar from "../../../../components/progress-bar";

import { useAppSelector } from "../../../../../redux/store";

import { StyledStage2ImgsTitle, StyledStage2ImgsWrapper, StyledProfileImgWrapper, StyledRow, StyledRowCoverAndProfileImgsWrapper, StyledCol } from "./styled";
import UploadImg from "../../../../components/upload-img";
import { ScrollView } from "react-native-virtualized-view";
import { type Props } from "./types";
import { memo, useEffect } from "react";

const Stage2Imgs = ({ profileImg, coverImg, regularImgs, onUploadCoverImg, onUploadProfileImg, onUploadRegularImg, onDeleteCoverImg, onDeleteRegularImg, profileImgErrorMessage }: Props) => {
  const business = useAppSelector((state) => state.business);

  return (
    <StyledStage2ImgsWrapper>
      <Progressbar currentStage={2} stages={5} />
      <StyledStage2ImgsTitle> {business.metaData.name}</StyledStage2ImgsTitle>
      <StyledRowCoverAndProfileImgsWrapper>
        <UploadImg onDelete={onDeleteCoverImg} text="+ הוספת תמונת רקע" variant="cover" onUpload={(asset) => onUploadCoverImg(asset[0])} source={coverImg ? coverImg : undefined} />
        <StyledProfileImgWrapper>
          <UploadImg error={profileImgErrorMessage} text="+ הוספת תמונת פרופיל" variant="profile" onUpload={(asset) => onUploadProfileImg(asset[0])} source={profileImg ? profileImg : undefined} />
        </StyledProfileImgWrapper>
      </StyledRowCoverAndProfileImgsWrapper>
      <StyledRow>
        <ScrollView horizontal>
          <StyledCol>
            <StyledRow>
              {regularImgs.map((img, index) => (
                <UploadImg key={index} onUpload={(asset) => onUploadRegularImg(asset[0])} onDelete={() => onDeleteRegularImg(index)} text="+ הוסף תמונה" variant="regular" source={img} />
              ))}
              {regularImgs.length < 3 &&
                Array(3 - regularImgs.length)
                  .fill(" ")
                  .map((_, index) => <UploadImg key={index} onUpload={(asset) => onUploadRegularImg(asset[0])} text="+ הוסף תמונה" variant="regular" />)}
            </StyledRow>
          </StyledCol>
        </ScrollView>
      </StyledRow>
      <UploadImg onUpload={(asset) => onUploadRegularImg(asset[0])} text="+ הוסף תמונה" variant="plus-button" />
    </StyledStage2ImgsWrapper>
  );
};
export default Stage2Imgs;
