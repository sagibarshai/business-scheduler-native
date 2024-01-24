import { TextInput } from "react-native";
import styled from "styled-components/native";

export const StyledWrapper =styled.View`
    position: relative;
    width: ${(props) => props.theme.inputs.sizes.s.width};
    height: ${(props) => props.theme.inputs.sizes.s.height};
    margin: 0 auto;
`

export const StyledPrimaryInput = styled.TextInput<{
  ref?: React.RefObject<TextInput>;
}>`
  width: 100%;
  height: 100%;
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => ( props.theme.border.colors.aqua)};
  border-radius: ${(props) => props.theme.border.radiuses.m};
  padding: 0 ${(props) => props.theme.spaces.m};
  font-size: ${(props) => props.theme.fonts.sizes.m};
  font-weight: ${(props) => props.theme.fonts.weights.m};
  margin: 0 auto;
  padding-right: ${props => props.theme.spaces.l};
  `

  export const StyledIconWrapper = styled.View`
    position: absolute;
    top: 15%;
    right: 10px;
  `