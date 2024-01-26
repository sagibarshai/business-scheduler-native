import { StyledText, StyledWrapper } from "./styled";
import { Props } from "./types";

const CountdownTimeDisplay = ({ hours, minutes, onPress }: Props) => {
  return (
    <StyledWrapper onPress={onPress}>
      <StyledText>{`${hours} : ${minutes}`}</StyledText>
    </StyledWrapper>
  );
};

export default CountdownTimeDisplay;
