import TimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { StyledLabel, StyledSelectTimeWrapper, StyledTimeButton, StyledText } from "./styled";
import { theme } from "../../../../theme";
import { useState } from "react";
import { Platform } from "react-native";
import { type Props } from "./types";

const SelectTime = ({ labelText, defaultValue, role, onChange, defaultParsedValue }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const platform = Platform.OS;

  const onChangeIsOpen = (open?: boolean) => (open ? setIsOpen(open) : setIsOpen(false));

  if (platform === "ios") {
    return (
      <StyledSelectTimeWrapper>
        <StyledLabel>{labelText}</StyledLabel>
        <TimePicker
          id={labelText}
          textColor={theme.palette.colors.lights.texts.aqua}
          accentColor={theme.palette.colors.lights.texts.aqua}
          onChange={(event) => {
            if (event.type === "set") onChange(event, role);
          }}
          minuteInterval={15}
          mode="time"
          value={defaultValue}
        />
      </StyledSelectTimeWrapper>
    );
  }
  return (
    <StyledSelectTimeWrapper>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledTimeButton onPress={() => onChangeIsOpen(true)}>
        <StyledText>{defaultParsedValue}</StyledText>
      </StyledTimeButton>
      {isOpen && (
        <TimePicker
          display="spinner"
          id={labelText}
          is24Hour
          textColor={theme.palette.colors.lights.texts.aqua}
          accentColor={theme.palette.colors.lights.texts.aqua}
          onChange={(event) => {
            if (event.type === "set") onChange(event, role);
            if (event.type === "set" || event.type === "dismissed") onChangeIsOpen();
          }}
          minuteInterval={15}
          mode="time"
          value={defaultValue}
        />
      )}
    </StyledSelectTimeWrapper>
  );
};
export default SelectTime;
