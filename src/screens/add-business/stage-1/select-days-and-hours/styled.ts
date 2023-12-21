import styled from "styled-components/native";

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
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.aqua};
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
export const StyledDaysAndHoursDisplayWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.m};
`
export const StyledRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: baseline;
`
export const StyledRowAndIconWrapper = styled(StyledRow)<{editMode:boolean}>`
    gap: ${props=> props.theme.spaces.s};
    width: 100%;
    opacity: ${props => props.editMode ? 0.5 : 1};
`
export const StyledText = styled.Text`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
`