import styled from 'styled-components/native'

import RTLText from '../../RTL/text';

import {type  StyledProps } from './types';


export const StyledCol = styled.View<StyledProps>`
  display: flex;
  width: ${props => props.width || '100%'};
  gap: ${(props) => props.theme.spaces.xs};
`;

export const StyledPrimaryInput = styled.TextInput<StyledProps>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : props.theme.inputs.sizes.m.height)};
  border-bottom-color: ${(props) => (props.error ? props.theme.palette.colors.lights.errors.red : props.theme.border.colors.black)};
  border-bottom-width : ${(props) => (props.theme.border.width.m)};;
  border-radius: ${(props) => props.theme.border.radiuses.m};
  padding: 0 ${(props) => props.theme.spaces.m};
  font-size: ${(props) => props.theme.fonts.sizes.l};
  font-weight: ${(props) => props.theme.fonts.weights.l};
  text-align: right;
  
`;
export const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spaces.s};
  
`;

export const StyledInputLabel = styled(RTLText)`
  font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;

export const StyledErrorMessage = styled.Text`
  color: ${(props) => props.theme.palette.colors.lights.errors.red};
  font-size: ${(props) => props.theme.fonts.sizes.m};
  font-weight: ${(props) => props.theme.fonts.weights.m};
  text-align: left;
  padding-left: ${(props) => props.theme.spaces.xs};
`;
export const StyledText = styled.Text`
  font-size: ${props => props.theme.fonts.sizes.l};
  font-weight: ${props => props.theme.fonts.weights.l};
  position: absolute;
  right: 0;
`
export const StyledInputCurrencyWrapper = styled(StyledRow)`
  align-items: center;
`