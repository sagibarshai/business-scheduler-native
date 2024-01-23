import CustomBottomSheet from "../bottom-sheet";
import { Props } from "./types";
import { DropdownButton, DropdownContainer, StyledDropdownItem, DropdownList, StyledDropdownText, StyledDropdownOption, StyledErrorMessage, StyledInputLabel, StyledRow, StyledDropdownTitle, StyledBottomSheetContent } from "./styled";
import { theme } from "../../../theme";
import IconArrowDown from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-virtualized-view";
import SearchBox from "../search-box";

const SearchLocation = ({ input, isOpen, onToggle, icon, label, placeholder, error }: Props) => {
  return (
    <DropdownContainer>
      <StyledRow>
        {icon}
        <StyledInputLabel>{label}</StyledInputLabel>
      </StyledRow>

      <DropdownButton error={error} onPress={onToggle}>
        <StyledDropdownText>{placeholder}</StyledDropdownText>
        <IconArrowDown color={theme.icons.colors.aqua} size={theme.icons.sizes.m} name="chevron-down" />
      </DropdownButton>

      <StyledErrorMessage>{error}</StyledErrorMessage>

      {isOpen && (
        <CustomBottomSheet height="70%" onClose={onToggle}>
          <StyledBottomSheetContent>
            <StyledDropdownTitle> {label} </StyledDropdownTitle>
            <SearchBox onChange={() => {}} error={""} />

            {/* <DropdownList>
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
            </DropdownList> */}

            {/* ok button */}
          </StyledBottomSheetContent>
        </CustomBottomSheet>
      )}
    </DropdownContainer>
  );
};

export default SearchLocation;
