import React from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputLabel, StyledPrimaryInput, StyledRow } from "./styled";
import { theme } from "../../../../theme";

const TextInput = ({ icon, label, placeholder, onChange, error, onBlur, onFocus, isTextArea, keyboardType, ...props }: Props) => (
  <StyledCol {...props}>
    <StyledRow>
      {icon}
      <StyledInputLabel>{label}</StyledInputLabel>
    </StyledRow>
    <StyledPrimaryInput
      keyboardType={keyboardType}
      placeholderTextColor={theme.inputs.placeholders.colors.blackAlpha7}
      isTextArea={isTextArea}
      placeholder={placeholder}
      multiline={isTextArea ? true : false}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      onChange={(event) => onChange(event)}
    />
    <StyledErrorMessage>{error}</StyledErrorMessage>
  </StyledCol>
);

export default TextInput;
