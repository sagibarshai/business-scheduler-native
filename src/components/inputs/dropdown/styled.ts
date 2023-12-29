import styled from "styled-components/native";

import { StyledProps } from "./types";
import RTLText from "../../RTL/text";


export const DropdownContainer = styled.View<Omit<StyledProps, "error">>`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
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
  position: absolute;
  /* top: 76px; */
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => props.theme.border.colors.black};
  z-index: 10;
  width: 100%;
  background-color: white;
  max-height: 250px;
  border-radius: ${(props) => props.theme.border.radiuses.m};
  bottom: 0;
  
`;

export const StyledDropdownItem = styled.TouchableOpacity`
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
`