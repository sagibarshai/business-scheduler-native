import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import KeyValueColumn from "../key-value-column";
import { theme } from "../../../theme";
import { StyledBusinessProfileTitle, StyledBusinessProfileWrapper } from "./styled";
import SelectedDaysAndHoursDisplay from "./selected-days-and-hour-display";
import { Props } from "./types";

const BusinessProfile = ({ selectedDaysAndHours, address, category, name }: Props) => {
  return (
    <StyledBusinessProfileWrapper>
      <StyledBusinessProfileTitle> {name} </StyledBusinessProfileTitle>
      <KeyValueColumn keyText="כתובת - " value={address} iconKey={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />
      <KeyValueColumn keyText="קטגוריה  " value={category} iconKey={<IconCategory size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="category" />} />
      <KeyValueColumn keyText="ימים ושעות  " value={<SelectedDaysAndHoursDisplay selectedDaysAndHours={selectedDaysAndHours} />} iconKey={<IconCategory size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="category" />} />
    </StyledBusinessProfileWrapper>
  );
};
export default BusinessProfile;
