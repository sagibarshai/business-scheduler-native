import React from "react";

import { type Props } from "./types";

import { StyledCol, StyledErrorMessage, StyledInputLabel, StyledPrimaryInput, StyledRow } from "./styled";
import { theme } from "../../../theme";

const SearchBox = ({ placeholder, onChange, error, ...props }: Props) => (
  <StyledCol>
    <StyledPrimaryInput placeholderTextColor={theme.inputs.placeholders.colors.blackAlpha7} placeholder={placeholder} error={error} onChange={(event) => onChange(event)} {...props} />
    <StyledErrorMessage>{error}</StyledErrorMessage>
  </StyledCol>
);

export default SearchBox;
