import { useState } from "react";
import { ScrollView } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../../../../theme";

import { Props } from "./types";

import { DropdownButton, DropdownContainer, StyledDropdownItem, DropdownList, StyledDropdownText, StyledDropdownOption } from "./styled";

export const Dropdown = ({ options, width, height, isOpen, onToggle }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("קטגוריה");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onToggle();
  };

  return (
    <DropdownContainer height={height} width={width}>
      <DropdownButton onPress={onToggle}>
        <StyledDropdownText>{selectedOption}</StyledDropdownText>
        <Icon color={theme.icons.colors.aqua} size={theme.icons.sizes.m} name="chevron-down" />
      </DropdownButton>
      {isOpen && (
        <DropdownList height={height} width={width}>
          <ScrollView>
            {options.map((option) => (
              <StyledDropdownItem key={option}>
                <StyledDropdownOption onPress={() => handleSelectOption(option)}>{option}</StyledDropdownOption>
              </StyledDropdownItem>
            ))}
          </ScrollView>
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
