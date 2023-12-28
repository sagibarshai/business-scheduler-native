import styled from "styled-components/native";

export const StyledBusinessProfileWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.l};
`

// StyledBusinessProfile

export const StyledBusinessProfileTitle = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
    text-align: center;
`