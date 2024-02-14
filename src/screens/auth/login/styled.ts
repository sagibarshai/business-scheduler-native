import styled, { css } from "styled-components/native";
import { theme } from "../../../../theme";

export const StyledWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.s};
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;
`

export const StyledTitle = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.title};
    font-weight: ${props => props.theme.fonts.weights.xl};
    color: ${props => props.theme.palette.colors.lights.texts.aqua};
    text-align: center;
`
export const StyledIconWrapper = styled.View`
    margin-top: ${props => props.theme.spaces.l};
`
export const StyledLoginButton = styled.TouchableOpacity<{disabled:boolean}>`
     font-weight: ${props => props.theme.fonts.weights.l};
    font-size: ${props => props.theme.fonts.sizes.l};
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.purple};
    width: 100%;
    height: ${props => props.theme.inputs.sizes.m.height};
    border-radius: ${props => props.theme.border.radiuses.l};
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? 0.8 : 1} ;
`

export const StyledText = styled.Text`
    color: ${props => props.theme.palette.colors.lights.texts.white};
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.m};
`

export const StyledRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const StyledLoginButtonWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.s};
    width: 100%;
`
export const StyledErrorMessage = styled(StyledText)`
    color: ${props => props.theme.palette.colors.lights.errors.red};
    text-align: center;
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
`

export const StyledNavigateToLoginPage = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: ${props => props.theme.spaces.l};
`


export const StyledNavigationToLoginPageText = styled(StyledText)<{underline?:boolean}>`
    color: ${props => props.theme.palette.colors.lights.texts.aqua};
    text-align: center;
    ${props => {
        if(props.underline) css`
    text-decoration-line: underline;

    font-weight: ${props => props.theme.fonts.weights.l} ;
        `

        return css``
    }}


`
