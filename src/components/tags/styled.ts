import styled from "styled-components/native";


export const StyledTagWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: min-content;
  padding: 0 ${props=> props.theme.spaces.m};
  background-color:${props => props.theme.palette.colors.lights.backgrounds.aqua};
  border-radius: ${props => props.theme.border.radiuses.m};
`
export const StyledTagText = styled.Text`
  color: ${props => props.theme.palette.colors.lights.texts.white};
  font-weight: ${props => props.theme.fonts.weights.l};
  font-size: ${props => props.theme.fonts.sizes.l};
`