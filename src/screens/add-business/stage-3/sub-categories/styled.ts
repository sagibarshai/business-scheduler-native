import styled from "styled-components/native";

export const StyledSubCategoriesWrapper = styled.View`
    display: flex;
    height: 80%;
    width: 100%;
    gap: ${props => props.theme.spaces.l};
    /* border: ${props => props.theme.border.width.l} ${props => props.theme.border.style.regular} ${props => props.theme.border.colors.aqua};
    border-radius: ${props => props.theme.border.radiuses.l}; */
`
export const StyledTableWrapper = styled.View`
    display: flex;
    flex-direction: row;
    
`
export const StyledPlusButtonWrapper = styled.View`
    display: flex;
    flex-direction: row-reverse;
`