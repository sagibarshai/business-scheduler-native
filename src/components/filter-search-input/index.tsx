import Icon from "react-native-vector-icons/MaterialIcons";
import { StyledIconWrapper, StyledPrimaryInput, StyledWrapper } from "./styled";
import { theme } from "../../../theme";
import { Props } from "./types";

const SearchInput = ({ list, onChange }: Props) => {
  const search = (inputText: string) => list.filter((item) => item.toLocaleLowerCase().includes(inputText.toLowerCase()));

  return (
    <StyledWrapper>
      <StyledPrimaryInput onChange={(e) => onChange(search(e.nativeEvent.text))} />
      <StyledIconWrapper>
        <Icon name="manage-search" size={theme.icons.sizes.m} color={theme.icons.colors.aqua} />
      </StyledIconWrapper>
    </StyledWrapper>
  );
};
export default SearchInput;
