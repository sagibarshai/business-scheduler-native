import { StyledText, StyledWrapper } from "./styled";
import { Props } from "./types";

const CountdownTimeDisplay = ({ hours, minutes, onPress, ...props }: Props) => {
  return (
    <StyledWrapper {...props} onPress={onPress}>
      <StyledText>{`${hours} : ${minutes}`}</StyledText>
    </StyledWrapper>
  );
};

export default CountdownTimeDisplay;
