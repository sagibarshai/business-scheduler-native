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

export const StyledTimeButton = styled.TouchableOpacity`
    width: 100%;
    height: ${props => props.theme.inputs.sizes.m.height};
    border: ${props => props.theme.border.width.m} ${props => props.theme.border.style.regular} ${props => props.theme.border.colors.black};
    color: ${props => props.theme.palette.colors.lights.texts.black};
    text-align: center;
    border-radius: ${props => props.theme.border.radiuses.m};
    display: flex;
    align-items: center;
    justify-content: center;
    
`
export const StyledTimeText = styled.Text`
  color: ${props => props.theme.inputs.placeholders.colors.blackAlpha7};
`