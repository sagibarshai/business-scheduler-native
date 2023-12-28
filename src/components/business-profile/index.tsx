import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import KeyValueColumn from "../key-value-column";
import { theme } from "../../../theme";
import { StyledBusinessProfileTitle, StyledBusinessProfileWrapper } from "./styled";
import SelectedDaysAndHoursDisplay from "./selected-days-and-hour-display";
import { useAppSelector } from "../../../redux/store";

const BusinessProfile = () => {
  const business = useAppSelector((state) => state.business);

  return (
    <StyledBusinessProfileWrapper>
      <StyledBusinessProfileTitle> {business.name} </StyledBusinessProfileTitle>
      <KeyValueColumn keyText="כתובת - " value={business.address} iconKey={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />
      <KeyValueColumn keyText="קטגוריה  " value={business.category} iconKey={<IconCategory size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="category" />} />
      <KeyValueColumn keyText="ימים ושעות  " value={<SelectedDaysAndHoursDisplay selectedDaysAndHours={business.workingDaysAndHours} />} iconKey={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />} />
    </StyledBusinessProfileWrapper>
  );
};
export default BusinessProfile;
