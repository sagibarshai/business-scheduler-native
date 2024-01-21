import styled from "styled-components/native";


// profile
export const StyledProfileImg = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    object-fit: cover;
    
`

export const StyledProfileImgWrapper = styled.View`
    position: relative;
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.gray};
    height: 100px;
    width: 100px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width:${props => props.theme.border.width.m} ;
    border-color:${props => props.theme.border.colors.gray} ;
`

export const StyledProfileText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.s};
    color: ${props => props.theme.palette.colors.lights.texts.aqua};
    font-weight: ${props => props.theme.fonts.weights.l};
`
export const StyledProfileUploadImgWrapper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spaces.s};
`

// cover

export const StyledCoverUploadImgWrapper = styled.TouchableOpacity`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spaces.s};
    border-radius: ${props => props.theme.border.radiuses.l};

    `

export const StyleCoverImgWrapper = styled.View`
    position: relative;
    border-radius: ${props => props.theme.border.radiuses.m};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 100%;
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.gray};
    border-width:${props => props.theme.border.width.m} ;
    border-color:${props => props.theme.border.colors.gray} ;
    
`

export const StyledCoverText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.s};
    color: ${props => props.theme.palette.colors.lights.texts.aqua};
    font-weight: ${props => props.theme.fonts.weights.l};
`


    
    

export const StyledCoverImg = styled.Image`
    height: 100%;
    width: 100%;
    border-radius: ${props => props.theme.border.radiuses.l};


`

export const StyledRegularUploadImgWrapper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spaces.s};
    border-radius: ${props => props.theme.border.radiuses.l};
`

export const StyleRegularImgWrapper = styled.View`
    position: relative;
     background-color: ${props => props.theme.palette.colors.lights.backgrounds.gray};
    height: 150px;
    width: 130px;
    border-radius: ${props => props.theme.border.radiuses.m};
    display: flex;
    justify-content: center;
    align-items: center;
`



export const StyledXButtonWrapper = styled.TouchableOpacity`
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.appBackground};
    opacity: 0.75;
    padding: 4px;
`

export const StyledXButtonText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.m};
    font-weight: ${props => props.theme.fonts.weights.m};
    color: ${props => props.theme.palette.colors.lights.texts.black};
`

export const StyledErrorMessageText = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.s};
    color: ${props => props.theme.palette.colors.lights.errors.red};
    font-weight: ${props => props.theme.fonts.weights.l};

`