import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import IconArrowDown from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import { theme } from "../../../../theme";

import { Props } from "./types";

import { DropdownButton, DropdownContainer, StyledDropdownItem, DropdownList, StyledDropdownText, StyledDropdownOption, StyledErrorMessage, StyledInputLabel, StyledRow } from "./styled";

const Dropdown = ({ options, width, height, isOpen, onToggle, onSelect, option, error }: Props) => {
  const handleSelectOption = (selectedOption: string) => onSelect(selectedOption);

  return (
    <DropdownContainer height={height} width={width}>
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
        <DropdownList height={height} width={width}>
          <ScrollView>
            {options.map((selectedOption) => (
              <StyledDropdownItem key={selectedOption}>
                <StyledDropdownOption onPress={() => handleSelectOption(selectedOption)}>{selectedOption}</StyledDropdownOption>
              </StyledDropdownItem>
            ))}
          </ScrollView>
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
export default Dropdown;
