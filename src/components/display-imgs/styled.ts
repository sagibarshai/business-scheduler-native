import styled from "styled-components/native";

export const StyledWrapper = styled.View`
    display: flex;
    gap: ${props => props.theme.spaces.m};
`

export const StyledImgTitle = styled.Text`
    font-size: ${props => props.theme.fonts.sizes.l};
    font-weight: ${props => props.theme.fonts.weights.l};
    text-align: center;
`
export const StyledRow = styled.View<{margin?:boolean}>`
    display: flex;
    flex-direction:row;
    gap: ${props => props.theme.spaces.m};
    margin-top: ${props => props.margin ? props.theme.spaces.m : 0};
    align-items: start;

`
export const StyledCol = styled.View`
    display: flex;
    flex:1;
    height: 100%;
    width: 50%;
    gap: ${props => props.theme.spaces.m};
`


export const  StyledRowCoverAndProfileImgsWrapper = styled.View`
    display: flex;
    width: 100%;
    position: relative;    
`


export const StyledProfileImg = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    object-fit: cover;
    
`

export const StyledProfileImgWrapper = styled.View`
    position: absolute;
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.gray};
    height: 100px;
    width: 100px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width:${props => props.theme.border.width.m} ;
    border-color:${props => props.theme.border.colors.gray} ;
    top: 50%;
    right: 0;
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

export const StyledProfileUploadImgWrapper = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${props => props.theme.spaces.s};
`
export const StyledText = styled.Text``

export const StyledModalContent = styled.View`
    width: 80%;
    height: 40%;
    background-color: black;
`
export const StyledModalImg = styled.Image`
    height: 100%;
    width: 100%;
    object-fit: fill;
   
`