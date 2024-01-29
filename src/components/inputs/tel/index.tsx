import React from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputLabel, StyledPrimaryInput, StyledRow } from "./styled";
import { theme } from "../../../../theme";

const TelInput = ({ icon, label, placeholder, onChange, error, onBlur, onFocus, isTextArea, ...props }: Props) => (
  <StyledCol>
    <StyledRow>
      {icon}
      <StyledInputLabel>{label}</StyledInputLabel>
    </StyledRow>
    <StyledPrimaryInput keyboardType="phone-pad" placeholderTextColor={theme.inputs.placeholders.colors.blackAlpha7} isTextArea={isTextArea} placeholder={placeholder} multiline={isTextArea ? true : false} onBlur={onBlur} onFocus={onFocus} error={error} onChange={(event) => onChange(event)} {...props} />
    <StyledErrorMessage>{error}</StyledErrorMessage>
  </StyledCol>
);

export default TelInput;
