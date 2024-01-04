import styled from "styled-components/native";
import { StyledProps } from "./types";

export const StyledBottomSheetWrapper = styled.Modal``;

export const StyledBottomSheetContent = styled.View<StyledProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.height}; 
  border-radius: 40px 40px 0 0 ;
  background-color: ${props => props.theme.palette.colors.lights.backgrounds.purple};
  background-color: white;
  border-width: 2px;
  border-color: ${props => props.theme.border.colors.aqua};
`;

export const StyledButtonWrapper = styled.View`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-width: 2px;
  border-radius: 100px;
  border-color: ${props => props.theme.palette.colors.lights.backgrounds.aqua};
`

export const StyledXButtonText = styled.Text`
  font-size: ${props => props.theme.fonts.sizes.m};
  color: ${props => props.theme.palette.colors.lights.texts.aqua};
  font-weight: ${props => props.theme.fonts.weights.xxl};

`
export const StyledChildrenWrapper = styled.View`
  height: 90%;
  width: 95%;
  margin: auto;
  margin-top: 80px;
`