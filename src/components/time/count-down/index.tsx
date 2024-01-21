import TimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { StyledLabel, StyledSelectTimeWrapper, StyledTimeButton, StyledText, StyledSaveButton } from "./styled";
import { theme } from "../../../../theme";
import { useState } from "react";
import { Platform } from "react-native";
import { type Props } from "./types";

const Countdown = ({ labelText, defaultValue, onChange }: Props) => {
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
};
export default Countdown;
