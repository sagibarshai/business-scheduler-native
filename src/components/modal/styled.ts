import styled from "styled-components/native";

export const StyledModal = styled.Modal`
    padding: ${props => props.theme.spaces.l};
    display: flex;
    justify-content: center;
    align-items: center;
`
export const StyledTitle = styled.Text`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.subtitle};
    font-weight: ${props => props.theme.fonts.weights.l};
    text-align: center;
    margin-top: ${props => props.theme.spaces.m};
`

export const StyledContent = styled.View<{height:string}>`
  height: ${props => props.height}; 
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  position: absolute;
  top: 0%;
  left: 0;
  right: 0;
  height: 100%;
`