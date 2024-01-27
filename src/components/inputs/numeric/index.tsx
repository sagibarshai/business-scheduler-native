import React from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputLabel, StyledPrimaryInput, StyledRow } from "./styled";
import { theme } from "../../../../theme";

const NumericInput = ({ icon, label, placeholder, onChange, error, onBlur, onFocus, ...props }: Props) => {
  return (
    <StyledCol>
      <StyledRow>
        {icon}
        <StyledInputLabel>{label}</StyledInputLabel>
      </StyledRow>
      <StyledPrimaryInput returnKeyType="done" returnKeyLabel="סיימתי" keyboardType="numeric" placeholderTextColor={theme.inputs.placeholders.colors.blackAlpha7} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} error={error} onChange={(event) => onChange(event)} {...props} />
      <StyledErrorMessage>{error}</StyledErrorMessage>
    </StyledCol>
  );
};

export default NumericInput;
