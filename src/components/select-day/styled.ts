import styled, { css } from "styled-components/native";

import { type StyledProps } from "./types";
export const StyledDayWrapper = styled.View<StyledProps>`
  width: 42px;
  height: 42px;
  border-radius: 100px;
  background-color: ${(props) => {
    if (props.disabled) return props.theme.palette.colors.lights.disabled.gray;
    else if (props.selected) return props.theme.palette.colors.lights.backgrounds.aqua;
    else if (!props.selected) return "transparent";
  }};

  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(props) =>
    props.selected || props.disabled
      ? "none"
      : css`
          ${(props) => props.theme.border.width.m}
          ${(props) => props.theme.border.style.regular}
    ${(props) => props.theme.border.colors.black}
        `};

  transition: all 2s ease;
`;

export const StyledDayText = styled.Text<Omit<StyledProps, "disabled">>`
  color: ${(props) => {
    if (!props.selected || props.disabled) return props.theme.palette.colors.lights.texts.black;
    else return props.theme.palette.colors.lights.texts.white;
  }};
  font-weight: ${(props) => props.theme.fonts.weights.l};
`;
