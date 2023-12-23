import styled from "styled-components/native";

import { StyledProps } from "./types";


export const DropdownContainer = styled.View<StyledProps>`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : props.theme.inputs.sizes.m.height)};
  z-index: 10;
`;

export const DropdownButton = styled.TouchableOpacity`
  padding: 10px;
  display: flex;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spaces.m};
`;

export const DropdownList = styled.View<StyledProps>`
  position: absolute;
  top: 40px; /* Adjust the top position as needed */
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => props.theme.border.colors.black};
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: 250px;
  border-radius: ${(props) => props.theme.border.radiuses.m};
`;

export const StyledDropdownItem = styled.TouchableOpacity`
  padding: 8px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.border.colors.aquaAlpha5};
`;
export const StyledDropdownOption = styled.Text`
  font-weight: ${(props) => props.theme.fonts.weights.m};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;
export const StyledDropdownText = styled.Text`
  font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;
