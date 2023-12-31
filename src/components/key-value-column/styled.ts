import styled from "styled-components/native";

export const StyledKeyValueColumn = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.xs};
`

export const StyledRow = styled.View`
    display: flex;
    flex-direction: row;
    gap: ${props => props.theme.spaces.s};
    align-items: center;
`

export const StyledKey = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.m};
    text-align: center;
`
export const StyledValue = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.m};
    text-align: center;
`
export const StyledIconWrapper = styled.View`
    
`