import styled from "styled-components/native";

export const StyledButton = styled.TouchableOpacity`
    width: 150px;
    height: 50px;
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.purple};
    border-radius: ${props=> props.theme.border.radiuses.m};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.theme.spaces.s};
`
export const StyledText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.l};
    color: ${props => props.theme.palette.colors.lights.texts.white};

`