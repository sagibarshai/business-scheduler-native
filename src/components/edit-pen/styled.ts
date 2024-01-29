import styled from "styled-components/native";

export const StyledEditPenWrapper = styled.View`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: ${props => props.theme.palette.colors.lights.backgrounds.aqua};
    width: 30px;
    height: 30px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`