import styled from "styled-components/native";


// profile
export const StyledProfileImg = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    object-fit: cover;
    
`

export const StyledProfileImgWrapper = styled.View`
    background-color: ${props => props.theme.palette.colors.lights.disabled.gray};
    height: 100px;
    width: 100px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledProfileText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
`
export const StyledProfileUploadImgWrapper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spaces.s};
`

// cover

export const StyleCoverImgWrapper = styled.View`
    border-radius: ${props => props.theme.border.radiuses.m};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    
`

export const StyledCoverText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
`

export const StyledCoverUploadImgWrapper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spaces.s};
    background-color: ${props => props.theme.palette.colors.lights.disabled.gray};
    border-radius: ${props => props.theme.border.radiuses.l};


`

export const StyledCoverImg = styled.Image`
    height: 150px;
    object-fit: contain;


`