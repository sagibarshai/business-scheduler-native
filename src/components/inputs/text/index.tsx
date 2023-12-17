import styled from "styled-components/native";
import RTLText from "../../RTL/text";

interface StyledProps {
  width?: string;
  height?: string;
}

interface Props extends StyledProps {
  icon: JSX.Element;
  label: string;
}

const StyledCol = styled.View`
  display: flex;
  height: fit-content;
  width: 100%;
  gap: ${(props) => props.theme.spaces.s};
`;

const StyledPrimaryInput = styled.TextInput<StyledProps>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : props.theme.inputs.sizes.m.height)};
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => props.theme.border.colors.black};
  border-radius: ${(props) => props.theme.border.radiuses.m};
  padding: 0 ${(props) => props.theme.spaces.m};
  font-size: ${(props) => props.theme.fonts.sizes.m};
  font-weight: ${(props) => props.theme.fonts.weights.m};
`;
const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spaces.s};
`;

const StyledInputLabel = styled(RTLText)`
  font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;

const TextInput = ({ icon, label, ...props }: Props) => (
  <StyledCol>
    <StyledRow>
      <RTLText>{icon}</RTLText>

      <StyledInputLabel>{label}</StyledInputLabel>
    </StyledRow>

    <StyledPrimaryInput {...props} />
  </StyledCol>
);

export default TextInput;
