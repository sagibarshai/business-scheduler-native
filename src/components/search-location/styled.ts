import styled from "styled-components/native";

import { StyledProps } from "./types";
import RTLText from "../RTL/text";


export const DropdownContainer = styled.View<Omit<StyledProps, "error">>`
  position: relative;
  width: 100%;
  z-index: 10;
  gap: ${props => props.theme.spaces.s};
`;

export const DropdownButton = styled.TouchableOpacity<StyledProps>`
  padding: 10px;
  display: flex;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s};
  border: ${props => props.theme.border.width.m} ${props => props.theme.border.style.regular} ${props => props.error ? props.theme.palette.colors.lights.errors.red : props.theme.border.colors.black};
  border-radius: ${props => props.theme.border.radiuses.m};
`;

export const StyledInputLabel = styled(RTLText)`
  font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;
export const DropdownList = styled.View<Omit<StyledProps,"error">>`
  border-radius: ${(props) => props.theme.border.radiuses.m};
  margin-bottom: 40px;
  height: 70%;
`;

export const StyledDropdownItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.spaces.m};
  padding: 8px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.border.colors.aquaAlpha5};

`;
export const StyledDropdownOption = styled(RTLText)`
  font-weight: ${(props) => props.theme.fonts.weights.m};
  font-size: ${(props) => props.theme.fonts.sizes.m};
  
`;
export const StyledDropdownText = styled.Text`
  font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
    color:${props => props.theme.inputs.placeholders.colors.purpleAlpha7}

`;

export const StyledErrorMessage = styled.Text`
color: ${(props) => props.theme.palette.colors.lights.errors.red};
font-size: ${(props) => props.theme.fonts.sizes.m};
font-weight: ${(props) => props.theme.fonts.weights.m};
text-align: left;
padding-left: ${(props) => props.theme.spaces.xs};
`;
export const StyledRow = styled.View`
  display: flex;
  flex-direction:row;
  align-items: center;
  gap: ${props => props.theme.spaces.s};
  height: 22px;
  flex-wrap: wrap;
  height: fit-content;
`


export const StyledDropdownTitle = styled.Text`
  text-align: center;
  font-size: ${props => props.theme.fonts.sizes.subtitle};
  font-weight: ${props => props.theme.fonts.weights.xl};
`

export const StyledBottomSheetContent = styled.View`
  display: flex;
  gap: ${props => props.theme.spaces.l};
`