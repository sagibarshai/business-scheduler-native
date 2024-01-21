import { StyledPlusButtonText, StyledPlusButtonWrapper } from "./styled";
import { Props } from "./types";

const PlusButton = ({ onPress }: Props) => {
  return (
    <StyledPlusButtonWrapper onPress={onPress}>
      <StyledPlusButtonText>+</StyledPlusButtonText>
    </StyledPlusButtonWrapper>
  );
};
export default PlusButton;
