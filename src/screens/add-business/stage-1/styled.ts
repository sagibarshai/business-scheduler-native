import styled from "styled-components/native";
import RTLText from "../../../components/RTL/text";

export const StyledStage1ScrollableView = styled.ScrollView`
    height: 100%;
`


export const StyledStage1Wrapper = styled.View`
    display: flex;
    height: 100%; 
    gap: ${props => props.theme.spaces.m};
  
`

export const StyledStage1Content = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.m};

`
export const StyledStage1Title = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.title}; 
    text-align: center;
    margin-top: ${props => props.theme.spaces.s};
`
export const StyledStage1Subtitle = styled.Text`
    text-align: center;
    margin-top: ${props => props.theme.spaces.s};
    font-size: ${props => props.theme.fonts.sizes.l}; 
`

export const StyledDaysAndLabelWrapper = styled.View`
    display: flex;
    gap: ${(props) => props.theme.spaces.s};
`
export const StyledDaysWrapper = styled.View`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
`

export const StyledDaysLabel = styled(RTLText)`
 font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`
export const StyledLabelIconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spaces.s};
`