import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import SelectedDaysAndHoursDisplay from "../selected-days-and-hour-display";
import Progressbar from "../../components/progress-bar";

import { useAppSelector } from "../../../redux/store";

import KeyValueColumn from "../key-value-column";
import { theme } from "../../../theme";
import { StyledBusinessProfileTitle, StyledBusinessProfileWrapper, StyledCol, StyledProfileImgWrapper, StyledRow, StyledRowCoverAndProfileImgsWrapper, StyledTextareaWrapper } from "./styled";
import UploadImg from "../upload-img";
import { type Asset } from "react-native-image-picker";
import { useState } from "react";
import Textarea from "../inputs/textarea";

const BusinessProfile = () => {
  const [profileImg, setProfileImg] = useState<null | Asset>();
  const [coverImage, setCoverImage] = useState<null | Asset>();
  const business = useAppSelector((state) => state.business);

  const stage1IsValid = business.metaData.address && business.metaData.category && business.metaData.workingDaysAndHours.length && business.metaData.name;

  const onProfileImgUpload = (asset: Asset[]) => {
    setProfileImg(asset[0]);
  };
  const onCoverImgUpload = (asset: Asset[]) => {
    setCoverImage(asset[0]);
  };

  return (
    <StyledBusinessProfileWrapper>
      <Progressbar currentStage={2} stages={5} />
      <StyledBusinessProfileTitle> {business.metaData.name} </StyledBusinessProfileTitle>
      <StyledRowCoverAndProfileImgsWrapper>
        <UploadImg onCancel={() => {}} text="+ הוספת תמונת רקע" variant="cover" onUpload={onCoverImgUpload} source={coverImage ? coverImage : undefined} />
        <StyledProfileImgWrapper>
          <UploadImg onCancel={() => {}} text="+ הוספת תמונת פרופיל" variant="profile" onUpload={onProfileImgUpload} source={profileImg ? profileImg : undefined} />
        </StyledProfileImgWrapper>
      </StyledRowCoverAndProfileImgsWrapper>
      <StyledTextareaWrapper>
        <Textarea label="תיאור של העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="subtitles-outline" />} onChange={() => {}} placeholder="זה המקום לפרט על העסק ושרותיו כדי שהלקוחות ידעו כמה שיותר" />
      </StyledTextareaWrapper>

      <KeyValueColumn keyText="קטגוריה - " value={business.metaData.category} iconKey={<IconCategory size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="category" />} />
      <KeyValueColumn keyText="כתובת - " value={business.metaData.address} iconKey={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />
      <KeyValueColumn keyText="ימים ושעות - " value={<SelectedDaysAndHoursDisplay selectedDaysAndHours={business.metaData.workingDaysAndHours} />} iconKey={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />} />
    </StyledBusinessProfileWrapper>
  );
};
export default BusinessProfile;
