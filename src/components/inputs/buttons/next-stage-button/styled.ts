import styled, {css} from "styled-components/native";
import { StyledProps } from "./types";

export const StyledNextStageButton = styled.TouchableOpacity<StyledProps>`
    font-weight: ${props => props.theme.fonts.weights.l};
    font-size: ${props => props.theme.fonts.sizes.l};
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.purple};
    width: 100%;
    height: ${props => props.theme.inputs.sizes.m.height};
    border-radius: ${props => props.theme.border.radiuses.l};
    position: fixed;
    bottom:0;
    z-index: 3;
    
    

    ${props => props.disabled ? css`
        opacity: 0.8;
    ` : css`
        opacity: 1;
    `}
  
    
    `
export const StyledRow = styled.View`
    height: 100%;
    width: 100%;
    align-items: start;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px;

`
export const StyledIconWrapper = styled.View`
    align-self: center;
    justify-self: center;
    position: absolute;
    right: 10px;
    
    `
export const StyledNextStageButtonText = styled.Text`
    color: ${props => props.theme.palette.colors.lights.texts.white};
    margin: 0 auto;

`