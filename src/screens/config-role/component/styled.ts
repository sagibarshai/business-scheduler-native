import styled from "styled-components/native";

export const StyledWrapper = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: blanchedalmond;
    flex-direction: row;
`

export const StyledBusinessButton = styled.TouchableOpacity`
    width: 150px;
    height: 50px;
    border: ${props => props.theme.border.width.m} ${props => props.theme.border.style.regular} ${props => props.theme.border.colors.black};
    border-radius: ${props=> props.theme.border.radiuses.m};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.theme.spaces.s};
`
export const StyledBusinessText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.l};
`

export const StyledUserButton = styled(StyledBusinessButton)`
    border: none;
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.aqua};
    `
export const StyledUserText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.l};
`
