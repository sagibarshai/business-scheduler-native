import TimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { StyledLabel, StyledSelectTimeWrapper, StyledTimeButton, StyledText, StyledSaveButton } from "./styled";
import { theme } from "../../../../theme";
import { useState } from "react";
import { Platform } from "react-native";
import { type Props } from "./types";

import { TimePicker as AndroidTimePicker, ValueMap } from "react-native-simple-time-picker";

const Countdown = ({ labelText, defaultValue, onChange, defaultParsedValue }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<ValueMap>({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });
  const handleChange = (newValue: ValueMap) => {
    setValue(newValue);
  };
  const platform = Platform.OS;

  const onChangeIsOpen = () => setIsOpen((prevState) => !prevState);

  if (platform === "ios") {
    return (
      <StyledSelectTimeWrapper>
        <StyledLabel>{labelText}</StyledLabel>
        <TimePicker
          display="spinner"
          id={labelText}
          textColor={theme.palette.colors.lights.texts.aqua}
          accentColor={theme.palette.colors.lights.texts.aqua}
          onChange={(event) => {
            if (event.type === "set") onChange(event);
          }}
          minuteInterval={15}
          mode="countdown"
          value={defaultValue}
        />
      </StyledSelectTimeWrapper>
    );
  }
  return (
    <StyledSelectTimeWrapper>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledTimeButton onPress={() => onChangeIsOpen()}>
        <StyledText>{defaultParsedValue}</StyledText>
      </StyledTimeButton>
      {isOpen && <AndroidTimePicker value={value} onChange={handleChange} />}
    </StyledSelectTimeWrapper>
  );
};
export default Countdown;
