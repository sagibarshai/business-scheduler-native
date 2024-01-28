import styled from "styled-components/native";

export const StyledSubCategoryFormWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.l};
`

export const StyledRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 80%;
    justify-content: space-between;
    
    
`
export const StyledTitle = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.subtitle};
    font-weight: ${props => props.theme.fonts.weights.l};
    text-align: center;
`
export const StyledButtonsWrapper = styled(StyledRow)`
    width: 80%;
    justify-content: space-between;
    align-self: center;
`
