import { StyledText, StyledWrapper } from "./styled";
import { Props } from "./types";

const CountdownTimeDisplay = ({ hours, minutes, onPress, ...props }: Props) => {
  let parsedMinutes = minutes.toString();
  if (parsedMinutes.length === 1) parsedMinutes = "0" + parsedMinutes;
  let parsedHours = hours.toString();
  if (parsedHours.length === 1) parsedHours = "0" + parsedHours;

  return (
    <StyledWrapper {...props} onPress={onPress}>
      <StyledText>{`${parsedHours} : ${parsedMinutes}`}</StyledText>
    </StyledWrapper>
  );
};

export default CountdownTimeDisplay;
