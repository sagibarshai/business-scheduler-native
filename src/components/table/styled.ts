import styled from "styled-components/native";
import { StyledProps } from "./types";
import { css } from "styled-components";

export const StyledTableWrapper = styled.View`
  display: flex;
  height: auto;
  width: 100%;
  
`;

export const StyledRow = styled.View`
  display: flex;
  flex-direction: row;  
`;

export const StyledHeaderRow = styled(StyledRow)`
  gap: ${props => props.theme.spaces.xs};
`

export const StyledCol = styled.View<StyledProps>`
  display: flex;
  flex: ${props => props.flex || 1 };
  border-bottom-color:${props => props.theme.border.colors.aquaAlpha5};
  border-bottom-width:${props => props.theme.border.width.m};
  padding: ${props => props.theme.spaces.s};
  justify-content: center;
`;

export const StyledText = styled.Text<StyledProps>`
text-align: left;
font-weight: ${props => props.isHeader ? props.theme.fonts.weights.xl : props.theme.fonts.weights.m};
font-size: ${props => props.isHeader ? props.theme.fonts.sizes.l : props.theme.fonts.sizes.m};
`;
