import React from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputLabel, StyledPrimaryInput, StyledRow } from "./styled";

const TextInput = ({ icon, label, placeholder, onChange, error, onBlur, onFocus, isTextArea, ...props }: Props) => (
  <StyledCol>
    <StyledRow>
      {icon}
      <StyledInputLabel>{label}</StyledInputLabel>
    </StyledRow>
    <StyledPrimaryInput isTextArea={isTextArea} placeholder={placeholder} multiline={isTextArea ? true : false} onBlur={onBlur} onFocus={onFocus} error={error} onChange={(event) => onChange(event)} {...props} />
    <StyledErrorMessage>{error}</StyledErrorMessage>
  </StyledCol>
);

export default TextInput;
