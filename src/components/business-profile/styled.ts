import styled from "styled-components/native";

export const StyledWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.l};
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 24px;
    
`
export const StyledSectionTitle = styled.Text`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
    text-align: left;

`

export const StyledCategoriesWrapper = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;   
    gap: ${props => props.theme.spaces.s};
`
export const StyledKeyValueWrapper = styled.View`
    display: flex;
    gap: ${props=> props.theme.spaces.s};
`
export const StyledIconAndTitleWrapper = styled.View`
    display: flex;
    flex-direction: row;
    gap: ${props => props.theme.spaces.s};
`

export const StyledText = styled.Text`
    color: ${props => props.theme.palette.colors.lights.texts.black};
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.m};
    text-align: left;`

    