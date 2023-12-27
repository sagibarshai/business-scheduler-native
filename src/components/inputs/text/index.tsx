import React from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputLabel, StyledPrimaryInput, StyledRow } from "./styled";

const TextInput = ({ icon, label, onChange, error, onBlur, onFocus, ...props }: Props) => (
  <StyledCol>
    <StyledRow>
      {icon}
      <StyledInputLabel>{label}</StyledInputLabel>
    </StyledRow>
    <StyledPrimaryInput onBlur={onBlur} onFocus={onFocus} error={error} onChange={(event) => onChange(event)} {...props} />
    <StyledErrorMessage>{error}</StyledErrorMessage>
  </StyledCol>
);

export default TextInput;
