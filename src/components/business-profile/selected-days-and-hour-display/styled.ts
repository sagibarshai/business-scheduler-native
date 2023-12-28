import styled from "styled-components/native"

import RTLText from "../../RTL/text"

export const StyledDaysAndHoursDisplayWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.m};
`
export const StyledRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: baseline;
`
export const StyledText = styled(RTLText)`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
`
export const StyledRowAndIconWrapper = styled(StyledRow)<{editMode:boolean}>`
    gap: ${props=> props.theme.spaces.s};
    width: 100%;
    opacity: ${props => props.editMode ? 0.5 : 1};
`
