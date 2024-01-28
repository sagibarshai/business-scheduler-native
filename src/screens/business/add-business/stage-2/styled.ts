import styled from "styled-components/native";

export const StyledStage2Wrapper = styled.View`
    flex: 1; 
    padding-bottom: 50px;
    display: flex;
    gap: ${props =>props.theme.spaces.l};
`   

export const StyledStage2Content = styled.View`
    flex: 1; 
    display:flex;
    gap: ${props => props.theme.spaces.m};
`

export const StyledText = styled.Text``

export const StyledTextareaWrapper = styled.View`
    margin-top: ${props => props.theme.spaces.l};
`