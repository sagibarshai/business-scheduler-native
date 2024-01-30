import styled from "styled-components/native";

export const StyledWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.l};
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;
`

export const StyledTitle = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.title};
    font-weight: ${props => props.theme.fonts.weights.xl};
    color: ${props => props.theme.palette.colors.lights.texts.aqua};
    text-align: center;
`
export const StyledIconWrapper = styled.View`
    margin-top: ${props => props.theme.spaces.l};
`
