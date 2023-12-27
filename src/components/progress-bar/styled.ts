import styled from "styled-components/native";

import RTLRow from "../RTL/row";
import RTLText from "../RTL/text";

import { type StyledProps } from "./types";

export const StyledProgressbarWrapper = styled.View`
  width: 85%;
  height: 11px;
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => props.theme.border.colors.aqua};
  background-color: transparent;
  position: relative;
  border-radius: ${(props) => props.theme.border.radiuses.xl};
`;

export const StyledProgress = styled.View<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.palette.colors.lights.backgrounds.aqua};
  width: ${(props) => props.width};
  height: 10px;
  border-radius: ${(props) => props.theme.border.radiuses.xl};
`;

export const StyledRow = styled(RTLRow)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

export const StyledText = styled(RTLText)`
  color: ${(props) => props.theme.palette.colors.lights.texts.aqua};
  font-size: ${(props) => props.theme.fonts.sizes.l};
  font-weight: ${(props) => props.theme.fonts.weights.l};
  width: 15%;
`;
