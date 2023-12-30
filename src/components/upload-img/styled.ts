import styled from "styled-components/native";

export const StyledImg = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    object-fit: cover;
    
`

export const StyledImgWrapper = styled.View`
    background-color: ${props => props.theme.palette.colors.lights.disabled.gray};
    height: 100px;
    width: 100px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
`
export const StyledUploadImgWrapper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spaces.s};
`