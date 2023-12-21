import styled from "styled-components/native";
import RTLText from "../RTL/text";

export const StyledSelectTimeWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.s};
`
export const StyledLabel = styled(RTLText)`
  color: ${props => props.theme.palette.colors.lights.texts.aqua};
  font-weight: ${props => props.theme.fonts.weights.l};
  font-size: ${props => props.theme.fonts.sizes.m};
`;

