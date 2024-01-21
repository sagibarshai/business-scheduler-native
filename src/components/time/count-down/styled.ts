import styled from "styled-components/native";
import RTLText from "../../RTL/text";

export const StyledSelectTimeWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.s};
`
export const StyledLabel = styled(RTLText)`
  color: ${props => props.theme.palette.colors.lights.texts.aqua};
  font-weight: ${props => props.theme.fonts.weights.l};
  font-size: ${props => props.theme.fonts.sizes.m};
`;

export const StyledTimeButton = styled.TouchableOpacity`
  border: ${props  => props.theme.border.width.m} ${props  => props.theme.border.style.regular} ${props  => props.theme.border.colors.black} ;
  height: ${props => props.theme.inputs.sizes.m.height};
  border-radius: ${props => props.theme.border.radiuses.m};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;

`

export const StyledText = styled(RTLText)`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
`
export const StyledSaveButton = styled.TouchableOpacity`
 border: ${props  => props.theme.border.width.m} ${props  => props.theme.border.style.regular} ${props  => props.theme.border.colors.black} ;
  height: ${props => props.theme.inputs.sizes.m.height};
  border-radius: ${props => props.theme.border.radiuses.m};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`