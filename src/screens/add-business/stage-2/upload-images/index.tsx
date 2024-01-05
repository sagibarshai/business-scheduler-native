import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Progressbar from "../../../../components/progress-bar";

import { useAppSelector } from "../../../../../redux/store";

import { theme } from "../../../../../theme";
import { StyledStage2ImgsTitle, StyledStage2ImgsWrapper, StyledProfileImgWrapper, StyledRow, StyledRowCoverAndProfileImgsWrapper, StyledTextareaWrapper, StyledCol } from "./styled";
import UploadImg from "../../../../components/upload-img";
import { type Asset } from "react-native-image-picker";
import { useState } from "react";
import Textarea from "../../../../components/inputs/textarea";
import { ScrollView } from "react-native-virtualized-view";

const Stage2Imgs = () => {
  const [profileImg, setProfileImg] = useState<Asset>();
  const [coverImage, setCoverImage] = useState<Asset>();
  const [businessPhotos, setBusinessPhotos] = useState<Asset[]>([]);

  const business = useAppSelector((state) => state.business);

  const onProfileImgUpload = (asset: Asset[]) => {
    setProfileImg(asset[0]);
  };
  const onCoverImgUpload = (asset: Asset[]) => {
    setCoverImage(asset[0]);
  };

  const onUploadBusinessPhoto = (asset: Asset[]) => {
    setBusinessPhotos([...businessPhotos, asset[0]]);
  };

  return (
    <ScrollView>
      <StyledStage2ImgsWrapper>
        <Progressbar currentStage={2} stages={5} />
        <StyledStage2ImgsTitle> {business.metaData.name} </StyledStage2ImgsTitle>
        <StyledRowCoverAndProfileImgsWrapper>
          <UploadImg onCancel={() => {}} text="+ הוספת תמונת רקע" variant="cover" onUpload={onCoverImgUpload} source={coverImage ? coverImage : undefined} />
          <StyledProfileImgWrapper>
            <UploadImg onCancel={() => {}} text="+ הוספת תמונת פרופיל" variant="profile" onUpload={onProfileImgUpload} source={profileImg ? profileImg : undefined} />
          </StyledProfileImgWrapper>
        </StyledRowCoverAndProfileImgsWrapper>
        <StyledRow>
          <ScrollView horizontal>
            <StyledCol>
              <StyledRow>
                {businessPhotos.map((business) => (
                  <UploadImg onUpload={(asset) => onUploadBusinessPhoto(asset)} onCancel={() => {}} text="+ הוסף תמונה" variant="regular" source={business} />
                ))}
              </StyledRow>
            </StyledCol>
          </ScrollView>
        </StyledRow>
        <UploadImg onUpload={onUploadBusinessPhoto} onCancel={() => {}} text="+ הוסף תמונה" variant="plus-button" />

        <StyledTextareaWrapper>
          <Textarea label="תיאור של העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="subtitles-outline" />} onChange={() => {}} placeholder="זה המקום לפרט על העסק ושרותיו כדי שהלקוחות ידעו כמה שיותר" />
        </StyledTextareaWrapper>
      </StyledStage2ImgsWrapper>
    </ScrollView>
  );
};
export default Stage2Imgs;
