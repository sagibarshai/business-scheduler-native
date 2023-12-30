import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import SelectedDaysAndHoursDisplay from "../selected-days-and-hour-display";

import { useAppSelector } from "../../../redux/store";

import KeyValueColumn from "../key-value-column";
import { theme } from "../../../theme";
import { StyledBusinessProfileTitle, StyledBusinessProfileWrapper, StyledCol, StyledImage, StyledImageWrapper, StyledRow } from "./styled";
import UploadImg from "../upload-img";
import { type Asset } from "react-native-image-picker";
import { useState } from "react";
import { Image } from "react-native";

const BusinessProfile = () => {
  const [profileImg, setProfileImg] = useState<null | Asset[]>([]);
  const business = useAppSelector((state) => state.business);

  const stage1IsValid = business.metaData.address && business.metaData.category && business.metaData.workingDaysAndHours.length && business.metaData.name;
  const businessPhotos = business.photos;

  const onUploadImg = (asset: Asset[]) => {
    setProfileImg(asset);
  };

  return (
    <StyledBusinessProfileWrapper>
      {stage1IsValid && (
        <>
          <StyledBusinessProfileTitle> {business.metaData.name} </StyledBusinessProfileTitle>
          <StyledRow>
            <StyledCol>
              <KeyValueColumn keyText="כתובת - " value={business.metaData.address} iconKey={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />
              <KeyValueColumn keyText="קטגוריה  " value={business.metaData.category} iconKey={<IconCategory size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="category" />} />
            </StyledCol>
            <StyledCol>
              <UploadImg onUpload={onUploadImg} source={profileImg ? profileImg[0] : undefined} />
            </StyledCol>
          </StyledRow>
          <KeyValueColumn keyText="ימים ושעות  " value={<SelectedDaysAndHoursDisplay selectedDaysAndHours={business.metaData.workingDaysAndHours} />} iconKey={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />} />
        </>
      )}
    </StyledBusinessProfileWrapper>
  );
};
export default BusinessProfile;
