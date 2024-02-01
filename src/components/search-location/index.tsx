import CustomBottomSheet from "../bottom-sheet";
import { Props } from "./types";
import {
  DropdownButton,
  DropdownContainer,
  StyledDropdownItem,
  DropdownList,
  StyledDropdownText,
  StyledDropdownOption,
  StyledErrorMessage,
  StyledInputLabel,
  StyledRow,
  StyledDropdownTitle,
  StyledBottomSheetContent,
} from "./styled";
import { theme } from "../../../theme";
import IconArrowDown from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-virtualized-view";
import SearchBox from "../search-box";
import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { appAxios } from "../../../axios";
import { AxiosError } from "axios";
import { useAppSelector } from "../../../redux/store";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SearchLocation = ({
  isOpen,
  onToggle,
  icon,
  label,
  placeholder,
  error,
  onSelect,
  value,
}: Props) => {
  const [textInput, setTextInput] = useState<string>("");
  const [locationsList, setLocationsList] = useState<string[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useAppSelector((state) => state.user);

  const onChangeInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setTextInput(e.nativeEvent.text);

  useEffect(() => {
    const fetchData = async () => {
      if (!textInput.length) {
        setLocationsList([]);
        return;
      }
      try {
        const response = await appAxios.get(`/search-location`, {
          params: {
            input: textInput,
          },
          headers: {
            Authorization: `Berar ${user.token}`,
          },
        });
        console.log("response ", response.config);
        const parsedResponse: any = response.data;
        setLocationsList(parsedResponse.locations);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) navigation.navigate("auth");
        onToggle();
        console.log("error ", error.response?.status);
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
        {!value && (
          <IconArrowDown
            color={theme.icons.colors.aqua}
            size={theme.icons.sizes.m}
            name="chevron-down"
          />
        )}
      </DropdownButton>

      <StyledErrorMessage>{error}</StyledErrorMessage>

      {isOpen && (
        <CustomBottomSheet height="70%" onClose={onToggle}>
          <StyledBottomSheetContent>
            <StyledDropdownTitle> {label} </StyledDropdownTitle>
            <SearchBox onChange={onChangeInput} error={""} />

            <DropdownList>
              <ScrollView>
                {locationsList?.map((location) => {
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
