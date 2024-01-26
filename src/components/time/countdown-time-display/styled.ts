import styled from "styled-components/native";
import RTLText from "../../RTL/text";

export const StyledWrapper = styled.TouchableOpacity`
    display: flex;
    /* border: ${props => props.theme.border.width.m} ${props => props.theme.border.style.regular} ${props => props.theme.border.colors.aqua}; */
   height: fit-content;
   width: min-content;
   padding: ${props => props.theme.spaces.s};
`

export const StyledText= styled(RTLText)`
    opacity: 0.4;
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.m};
`