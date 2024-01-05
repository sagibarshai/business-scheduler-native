import { ScrollView } from "react-native";

import IconArrowDown from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../../../../theme";

import { Props } from "./types";

import { DropdownButton, DropdownContainer, StyledDropdownItem, DropdownList, StyledDropdownText, StyledDropdownOption, StyledErrorMessage, StyledInputLabel, StyledRow, StyledCategoryDisplayText, StyledCategoryDisplayWrapper, StyledDropdownTitle, StyledBottomSheetContent } from "./styled";
import CustomBottomSheet from "../../bottom-sheet";
import CheckBox from "react-native-check-box";
import SearchInput from "../../search-input";
import { useEffect, useState } from "react";

const Dropdown = ({ options, selectedCategories, isOpen, onToggle, onSelect, error, label, icon, placeholder }: Props) => {
  const [filteredList, setFilteredList] = useState<string[]>([...options]);

  const handleSelectOption = (selectedOption: string) => onSelect(selectedOption);

  const onSearchInputChange = (list: string[]) => setFilteredList(list);

  useEffect(() => {
    setFilteredList(options);
  }, [isOpen]);

  return (
    <DropdownContainer>
      <StyledRow>
        {icon}
        <StyledInputLabel>{label}</StyledInputLabel>
      </StyledRow>

      {!selectedCategories.length ? (
        <DropdownButton error={error} onPress={onToggle}>
          <StyledDropdownText>{placeholder} </StyledDropdownText>
          <IconArrowDown color={theme.icons.colors.aqua} size={theme.icons.sizes.m} name="chevron-down" />
        </DropdownButton>
      ) : (
        <StyledRow>
          {selectedCategories.map((category) => (
            <StyledCategoryDisplayWrapper key={category} onPress={onToggle}>
              <StyledCategoryDisplayText>{category}</StyledCategoryDisplayText>
            </StyledCategoryDisplayWrapper>
          ))}
        </StyledRow>
      )}
      <StyledErrorMessage>{error}</StyledErrorMessage>

      {isOpen && (
        <CustomBottomSheet height="70%" onClose={onToggle}>
          <StyledBottomSheetContent>
            <StyledDropdownTitle> {label} </StyledDropdownTitle>
            <SearchInput list={options} onChange={(list) => onSearchInputChange(list)} />

            <DropdownList>
              <ScrollView>
                {filteredList.map((selectedOption) => {
                  const isSelected = selectedCategories.find((category) => category === selectedOption);
                  return (
                    <StyledDropdownItem key={selectedOption} onPress={() => handleSelectOption(selectedOption)}>
                      <CheckBox checkedCheckBoxColor={theme.palette.colors.lights.texts.aqua} uncheckedCheckBoxColor={theme.palette.colors.lights.texts.purple} isChecked={Boolean(isSelected)} onClick={() => handleSelectOption(selectedOption)} />
                      <StyledDropdownOption>{selectedOption}</StyledDropdownOption>
                    </StyledDropdownItem>
                  );
                })}
              </ScrollView>
            </DropdownList>
            {/* ok button */}
          </StyledBottomSheetContent>
        </CustomBottomSheet>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
