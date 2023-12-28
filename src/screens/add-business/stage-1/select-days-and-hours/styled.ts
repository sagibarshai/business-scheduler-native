import styled, { css } from "styled-components/native";
import RTLText from "../../../../components/RTL/text";

export const StyledWrapper = styled.View`
    display: flex;
    gap:${props => props.theme.spaces.l};
`

export const StyledSelectTimeWrapper = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

`
export const StyledTimeWrapper = styled.View`
    width: 30%;
`
export const StyledTimeSaveButton = styled.TouchableOpacity`
    background-color: ${props => props.disabled ? props.theme.palette.colors.lights.disabled.aqua : props.theme.palette.colors.lights.backgrounds.aqua};
    width: 100%;
    height: ${props => props.theme.inputs.sizes.m.height};
    text-align: center;
    border-radius: ${props => props.theme.border.radiuses.m};
    display: flex;
    align-items: center;
    justify-content: center;
    
`
export const StyledTimeSaveButtonText = styled.Text`
    color: ${props => props.theme.palette.colors.lights.texts.white};
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
`



export const StyledErrorMessage = styled(RTLText)`
    color: ${(props) => props.theme.palette.colors.lights.errors.red};
    font-size: ${(props) => props.theme.fonts.sizes.m};
    font-weight: ${(props) => props.theme.fonts.weights.m};
    text-align: left;
    padding-left: ${(props) => props.theme.spaces.xs};
    `
    