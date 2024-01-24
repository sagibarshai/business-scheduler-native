import CustomBottomSheet from "../bottom-sheet";
import { Props } from "./types";
import { DropdownButton, DropdownContainer, StyledDropdownItem, DropdownList, StyledDropdownText, StyledDropdownOption, StyledErrorMessage, StyledInputLabel, StyledRow, StyledDropdownTitle, StyledBottomSheetContent } from "./styled";
import { theme } from "../../../theme";
import IconArrowDown from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-virtualized-view";
import SearchBox from "../search-box";
import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from "react-native";
import axios from "axios";

const SearchLocation = ({ isOpen, onToggle, icon, label, placeholder, error, onSelect, value }: Props) => {
  const [textInput, setTextInput] = useState<string>("");
  const [locationsList, setLocationsList] = useState<string[]>([]);

  const onChangeInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => setTextInput(e.nativeEvent.text);

  useEffect(() => {
    const fetchData = async () => {
      if (!textInput.length) {
        setLocationsList([]);
        return;
      }
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${textInput}&key=AIzaSyA0puLIR9nfTrgLHUuwmoewVYzDLB_kSFU`);
        const parsedResponse: any = response.data;
        const updatedLocationsList = parsedResponse.predictions.map((location: Record<string, string>) => location.description);
        setLocationsList(updatedLocationsList);
      } catch (err) {
        console.log("err ", err);
      }
    };
    fetchData();
  }, [textInput]);

  return (
    <DropdownContainer>
      <StyledRow>
        {icon}
        <StyledInputLabel>{label}</StyledInputLabel>
      </StyledRow>

      <DropdownButton error={error} onPress={onToggle}>
        <StyledDropdownText>{value ? value : placeholder}</StyledDropdownText>
        {!value && <IconArrowDown color={theme.icons.colors.aqua} size={theme.icons.sizes.m} name="chevron-down" />}
      </DropdownButton>

      <StyledErrorMessage>{error}</StyledErrorMessage>

      {isOpen && (
        <CustomBottomSheet height="70%" onClose={onToggle}>
          <StyledBottomSheetContent>
            <StyledDropdownTitle> {label} </StyledDropdownTitle>
            <SearchBox onChange={onChangeInput} error={""} />

            <DropdownList>
              <ScrollView>
                {locationsList.map((location) => {
                  return (
                    <StyledDropdownItem key={location} onPress={() => onSelect(location)}>
                      <StyledDropdownOption>{location}</StyledDropdownOption>
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

export default SearchLocation;
