import React, { useState } from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputCurrencyWrapper, StyledInputLabel, StyledPrimaryInput, StyledRow, StyledText } from "./styled";
import { theme } from "../../../../theme";

const NumericInput = ({ icon, label, placeholder, onChange, error, onBlur, onFocus, withCurrency, value, ...props }: Props) => {
  const [inputValue, setInputValue] = useState<string>(value || "");

  return (
    <StyledCol {...props}>
      <StyledRow>
        {icon}
        <StyledInputLabel>{label}</StyledInputLabel>
      </StyledRow>
      <StyledInputCurrencyWrapper>
        {withCurrency && <StyledText>₪</StyledText>}
        <StyledPrimaryInput
          value={inputValue}
          returnKeyType="done"
          returnKeyLabel="סיימתי"
          keyboardType="numeric"
          placeholderTextColor={theme.inputs.placeholders.colors.blackAlpha7}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          error={error}
          onChange={(event) => {
            onChange(event);
            setInputValue(event.nativeEvent.text);
          }}
          {...props}
        />
      </StyledInputCurrencyWrapper>
      <StyledErrorMessage>{error}</StyledErrorMessage>
    </StyledCol>
  );
};

export default NumericInput;
