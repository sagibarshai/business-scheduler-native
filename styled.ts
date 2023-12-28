import styled, { css } from "styled-components/native";

import { type StyledProps } from "./types";

export const StyledAppWrapper = styled.View<StyledProps>`

  ${(props) =>
    props.platform.OS === "ios"
      ? css`
          width: 100%;
          height: 100%;
        `
      : css`
          width: 100%;
          height: 100%;
        `}
  display: flex;
  margin: auto;

`

