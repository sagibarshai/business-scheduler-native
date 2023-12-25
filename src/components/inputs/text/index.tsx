import styled from "styled-components/native";
import RTLText from "../../RTL/text";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import React from "react";

interface StyledProps {
  width?: string;
  height?: string;
  error: string | null;
}

interface Props extends StyledProps {
  icon: JSX.Element;
  label: string;
  onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  error: string | null;
  onBlur: () => void;
  onFocus: () => void;
}

const StyledCol = styled.View`
  display: flex;
  height: fit-content;
  width: 100%;
  gap: ${(props) => props.theme.spaces.s};
`;

const StyledPrimaryInput = styled.TextInput<StyledProps>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : props.theme.inputs.sizes.m.height)};
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => (props.error ? props.theme.palette.colors.lights.errors.red : props.theme.border.colors.black)};
  border-radius: ${(props) => props.theme.border.radiuses.m};
  padding: 0 ${(props) => props.theme.spaces.m};
  font-size: ${(props) => props.theme.fonts.sizes.m};
  font-weight: ${(props) => props.theme.fonts.weights.m};
`;
const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spaces.s};
`;

const StyledInputLabel = styled(RTLText)`
  font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;

const StyledErrorMessage = styled.Text`
  color: ${(props) => props.theme.palette.colors.lights.errors.red};
  font-size: ${(props) => props.theme.fonts.sizes.m};
  font-weight: ${(props) => props.theme.fonts.weights.m};
  text-align: left;
  padding-left: ${(props) => props.theme.spaces.xs};
`;

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
