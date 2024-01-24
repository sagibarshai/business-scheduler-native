import React, { useEffect, useRef } from "react";

import { type Props } from "./types";

import Icon from "react-native-vector-icons/MaterialIcons";

import { StyledIconWrapper, StyledPrimaryInput, StyledWrapper } from "./styled";
import { theme } from "../../../theme";
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from "react-native";

const SearchBox = ({ placeholder, onChange }: Props) => {
  const onInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => onChange(e);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <StyledWrapper>
      <StyledPrimaryInput placeholder={placeholder} ref={inputRef} onChange={onInputChange} />
      <StyledIconWrapper>
        <Icon name="manage-search" size={theme.icons.sizes.m} color={theme.icons.colors.aqua} />
      </StyledIconWrapper>
    </StyledWrapper>
  );
};

export default SearchBox;
