import { StyledButton, StyledText } from "./styled";
import { Props } from "./types";

const CancelButton = ({ onPress, text }: Props) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
};
export default CancelButton;
