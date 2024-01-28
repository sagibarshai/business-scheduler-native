import styled from "styled-components/native";
import RTLText from "../../RTL/text";
import { StyledProps } from "./types";

export const StyledWrapper = styled.TouchableOpacity<StyledProps>`
  display: flex;
  height: fit-content;
  /* width: ${props => props.width || '100%'}; */
  border-bottom-width: ${props => props.theme.border.width.m};
  border-bottom-color: ${props => props.theme.border.colors.black};
  padding: 0 ${(props) => props.theme.spaces.m};
  font-size: ${(props) => props.theme.fonts.sizes.m};
  font-weight: ${(props) => props.theme.fonts.weights.m};
  text-align: right;
  gap: ${(props) => props.theme.spaces.s};

`

export const StyledText= styled(RTLText)`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};

`