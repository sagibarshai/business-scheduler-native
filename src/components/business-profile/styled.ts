import styled from "styled-components/native";

export const StyledBusinessProfileWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.m};
`

// StyledBusinessProfile

export const StyledBusinessProfileTitle = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
    text-align: center;
`
export const StyledRow = styled.View`
    display: flex;
    flex-direction:row;
    gap: ${props => props.theme.spaces.l};
`
export const StyledCol = styled.View`
    display: flex;
    flex:1;
    height: 100%;
    width: 50%;
    gap: ${props => props.theme.spaces.m};

`

export const StyledImageWrapper = styled.View`
    

`
export const StyledImage = styled.Image`
    object-fit: contain;
    width:100px;
    height:100px;
    border-radius: 100px;
    `