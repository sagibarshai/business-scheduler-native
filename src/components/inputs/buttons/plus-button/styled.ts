import styled from "styled-components/native"

export const StyledPlusButtonWrapper = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-width: 2px;
  border-radius: 100px;
  border-color: ${props => props.theme.palette.colors.lights.backgrounds.aqua};
`

export const StyledPlusButtonText = styled.Text`
  font-size: ${props => props.theme.fonts.sizes.l};
  color: ${props => props.theme.palette.colors.lights.texts.aqua};
  font-weight: ${props => props.theme.fonts.weights.xxl};

`