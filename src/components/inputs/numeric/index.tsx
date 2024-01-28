import React from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputCurrencyWrapper, StyledInputLabel, StyledPrimaryInput, StyledRow, StyledText } from "./styled";
import { theme } from "../../../../theme";

const NumericInput = ({ icon, label, placeholder, onChange, error, onBlur, onFocus, withCurrency, ...props }: Props) => {
  return (
    <StyledCol {...props}>
      <StyledRow>
        {icon}
        <StyledInputLabel>{label}</StyledInputLabel>
      </StyledRow>
      <StyledInputCurrencyWrapper>
        {withCurrency && <StyledText>₪</StyledText>}
        <StyledPrimaryInput returnKeyType="done" returnKeyLabel="סיימתי" keyboardType="numeric" placeholderTextColor={theme.inputs.placeholders.colors.blackAlpha7} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} error={error} onChange={(event) => onChange(event)} {...props} />
      </StyledInputCurrencyWrapper>
      <StyledErrorMessage>{error}</StyledErrorMessage>
    </StyledCol>
  );
};

export default NumericInput;
