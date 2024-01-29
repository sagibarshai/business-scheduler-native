import { useAppSelector } from "../../../redux/store";
import { theme } from "../../../theme";
import Tag from "../tags";
import { StyledCategoriesWrapper, StyledIconAndTitleWrapper, StyledKeyValueWrapper, StyledSectionTitle, StyledText, StyledWrapper } from "./styled";
import { type Props } from "./types";
import IconCategory from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectedDaysAndHoursDisplay from "../selected-days-and-hour-display";

const BusinessProfile = ({ isEditMode }: Props) => {
  const business = useAppSelector((state) => state.business);
  console.log("business ", business);

  return (
    <StyledWrapper>
      <StyledKeyValueWrapper></StyledKeyValueWrapper>

      <StyledKeyValueWrapper>
        <StyledIconAndTitleWrapper>
          <IconCategory name="category" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />
          <StyledSectionTitle>קטגוריות</StyledSectionTitle>
        </StyledIconAndTitleWrapper>
        <StyledCategoriesWrapper>
          {business.metaData.categories.map((category) => (
            <Tag text={category} onPress={() => {}} />
          ))}
        </StyledCategoriesWrapper>
      </StyledKeyValueWrapper>
      <StyledKeyValueWrapper>
        <StyledIconAndTitleWrapper>
          <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />
          <StyledSectionTitle>שם העסק</StyledSectionTitle>
        </StyledIconAndTitleWrapper>
        <StyledText>{business.metaData.name}</StyledText>
      </StyledKeyValueWrapper>
      <StyledKeyValueWrapper>
        <StyledIconAndTitleWrapper>
          <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />
          <StyledSectionTitle>כתובת העסק</StyledSectionTitle>
        </StyledIconAndTitleWrapper>
        <StyledText>{business.metaData.address}</StyledText>
      </StyledKeyValueWrapper>
      <StyledKeyValueWrapper>
        <StyledIconAndTitleWrapper>
          <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
          <StyledSectionTitle>ימים ושעות</StyledSectionTitle>
        </StyledIconAndTitleWrapper>
        <SelectedDaysAndHoursDisplay selectedDaysAndHours={business.metaData.workingDaysAndHours} />
      </StyledKeyValueWrapper>
    </StyledWrapper>
  );
};
export default BusinessProfile;
