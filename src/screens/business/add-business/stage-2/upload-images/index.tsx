import {
  StyledStage2ImgsWrapper,
  StyledProfileImgWrapper,
  StyledRow,
  StyledRowCoverAndProfileImgsWrapper,
  StyledCol,
} from "./styled";
import UploadImg from "../../../../../components/upload-img";
import { ScrollView } from "react-native-virtualized-view";
import { type Props } from "./types";

const Stage2Imgs = ({
  profileImg,
  coverImg,
  regularImgs,
  onUploadCoverImg,
  onUploadProfileImg,
  onUploadRegularImg,
  onDeleteCoverImg,
  onDeleteRegularImg,
  profileImgErrorMessage,
  onCancelProfileImg,
}: Props) => {
  return (
    <StyledStage2ImgsWrapper>
      <StyledRowCoverAndProfileImgsWrapper>
        <UploadImg
          onDelete={onDeleteCoverImg}
          text="+ הוספת תמונת רקע"
          variant="cover"
          onUpload={(asset) => onUploadCoverImg(asset[0])}
          source={coverImg ? coverImg : undefined}
        />
        <StyledProfileImgWrapper>
          <UploadImg
            onCancel={onCancelProfileImg}
            error={profileImgErrorMessage}
            text="+ הוספת תמונת פרופיל"
            variant="profile"
            onUpload={(asset) => onUploadProfileImg(asset[0])}
            source={profileImg ? profileImg : undefined}
          />
        </StyledProfileImgWrapper>
      </StyledRowCoverAndProfileImgsWrapper>
      <StyledRow>
        <ScrollView horizontal>
          <StyledCol>
            <StyledRow>
              {regularImgs.map((img, index) => (
                <UploadImg
                  key={index}
                  onUpload={(asset) => onUploadRegularImg(asset[0])}
                  onDelete={() => onDeleteRegularImg(index)}
                  text="+ הוסף תמונה"
                  variant="regular"
                  source={img}
                />
              ))}
              {regularImgs.length < 3 &&
                Array(3 - regularImgs.length)
                  .fill(" ")
                  .map((_, index) => (
                    <UploadImg
                      key={index}
                      onUpload={(asset) => onUploadRegularImg(asset[0])}
                      text="+ הוסף תמונה"
                      variant="regular"
                    />
                  ))}
            </StyledRow>
          </StyledCol>
        </ScrollView>
      </StyledRow>
      <UploadImg
        onUpload={(asset) => onUploadRegularImg(asset[0])}
        text="+ הוסף תמונה"
        variant="plus-button"
      />
    </StyledStage2ImgsWrapper>
  );
};
export default Stage2Imgs;
