import styled from "styled-components/native";

export const StyledSubCategoriesWrapper = styled.View`
    display: flex;
    height: 80%;
    width: 100%;
    gap: ${props => props.theme.spaces.l};
`
export const StyledTableWrapper = styled.View`
    display: flex;
    flex-direction: row;
    
`
export const StyledPlusButtonWrapper = styled.View`
    display: flex;
    flex-direction: row-reverse;
    position: relative;
`
export const StyledErrorMessage = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.l};
    color: ${props => props.theme.palette.colors.lights.errors.red};
    position: absolute;
    bottom:-50px;

`