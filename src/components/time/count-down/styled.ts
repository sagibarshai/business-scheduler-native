import styled from "styled-components/native";
import RTLText from "../../RTL/text";

export const StyledSelectTimeWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.m};
`
export const StyledLabel = styled(RTLText)`
  color: ${props => props.theme.palette.colors.lights.texts.black};
  font-weight: ${props => props.theme.fonts.weights.l};
  font-size: ${props => props.theme.fonts.sizes.m};
`;



export const StyledText = styled(RTLText)`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
`

export const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spaces.s};
`;