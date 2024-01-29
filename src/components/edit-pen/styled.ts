import styled from "styled-components/native";

export const StyledEditPenWrapper = styled.View`
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.aqua};
    width: 30px;
    height: 30px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    
`
export const StyledText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.s};
    font-weight: ${props => props.theme.fonts.weights.l};
    color: ${props => props.theme.palette.colors.lights.texts.aqua};
`
export const StyledWrapper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
`