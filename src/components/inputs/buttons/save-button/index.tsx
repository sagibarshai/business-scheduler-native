import { StyledButton, StyledText } from "./styled";
import { Props } from "./types";

const SaveButton = ({ onPress, text }: Props) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
};
export default SaveButton;
