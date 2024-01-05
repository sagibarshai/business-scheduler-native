import styled from "styled-components/native";

export const StyledBusinessProfileWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.m};
    padding-bottom: 100;
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
    gap: ${props => props.theme.spaces.m};
`
export const StyledCol = styled.View`
    display: flex;
    flex:1;
    height: 100%;
    width: 50%;
    gap: ${props => props.theme.spaces.m};
`


export const  StyledRowCoverAndProfileImgsWrapper = styled.View`
    display: flex;
    width: 100%;
    position: relative;
    
`

export const StyledProfileImgWrapper = styled.View`
    position: absolute;
    top: 50%;
    z-index: 100;
    right :0 ;

`
export const StyledTextareaWrapper = styled.View`
    margin-top: ${props => props.theme.spaces.m};
`