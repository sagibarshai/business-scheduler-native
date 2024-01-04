import { ScrollView } from "react-native";

import IconArrowDown from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import { theme } from "../../../../theme";

import { Props } from "./types";

import { DropdownButton, DropdownContainer, StyledDropdownItem, DropdownList, StyledDropdownText, StyledDropdownOption, StyledErrorMessage, StyledInputLabel, StyledRow } from "./styled";
import CustomBottomSheet from "../../bottom-sheet";
import CheckBox from "react-native-check-box";

const Dropdown = ({ options, isOpen, onToggle, onSelect, option, error }: Props) => {
  const handleSelectOption = (selectedOption: string) => onSelect(selectedOption);

  return (
    <DropdownContainer>
      <StyledRow>
        <IconCategory name="category" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />
        <StyledInputLabel>קטגוריה</StyledInputLabel>
      </StyledRow>

      <DropdownButton error={error} onPress={onToggle}>
        {!isOpen ? (
          <>
            <StyledDropdownText>{option}</StyledDropdownText>
            <IconArrowDown color={theme.icons.colors.aqua} size={theme.icons.sizes.m} name="chevron-down" />
          </>
        ) : (
          <StyledDropdownText>חיפוש כאן</StyledDropdownText>
        )}
      </DropdownButton>
      <StyledErrorMessage>{error}</StyledErrorMessage>
      {isOpen && (
        <CustomBottomSheet height="70%" onClose={onToggle}>
          {/* input with search functionality */}
          <DropdownList>
            <ScrollView>
              {options.map((selectedOption) => (
                <StyledDropdownItem key={selectedOption}>
                  <CheckBox checkedCheckBoxColor={theme.palette.colors.lights.texts.purple} uncheckedCheckBoxColor={theme.palette.colors.lights.texts.purple} isChecked={true} onClick={() => {}} />
                  <StyledDropdownOption onPress={() => handleSelectOption(selectedOption)}>{selectedOption}</StyledDropdownOption>
                </StyledDropdownItem>
              ))}
            </ScrollView>
          </DropdownList>
          {/* ok button */}
        </CustomBottomSheet>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
