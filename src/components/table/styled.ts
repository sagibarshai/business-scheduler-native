import styled from "styled-components/native";
import { StyledProps } from "./types";
import { css } from "styled-components";

export const StyledTableWrapper = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  
`;

export const StyledRow = styled.View`
  display: flex;
  flex-direction: row;  
`;

export const StyledCol = styled.View<StyledProps>`
  display: flex;
  flex: 1;
  border: ${props => props.theme.border.width.m} ${props => props.theme.border.style.regular} ${props => props.theme.border.colors.aqua};
  padding: ${props => props.theme.spaces.s};
`;

export const StyledText = styled.Text<StyledProps>`
text-align: left;
font-weight: ${props => props.isHeader ? props.theme.fonts.weights.xl : props.theme.fonts.weights.m};
font-size: ${props => props.isHeader ? props.theme.fonts.sizes.l : props.theme.fonts.sizes.m};
`;
