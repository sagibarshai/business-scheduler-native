import { StyledBigWrapper, StyledErrorText, StyledText, StyledWrapper } from "./styled";
import { Props } from "./types";

const CountdownTimeDisplay = ({ hours, minutes, onPress, error, ...props }: Props) => {
  let parsedMinutes = minutes.toString();
  if (parsedMinutes.length === 1) parsedMinutes = "0" + parsedMinutes;
  let parsedHours = hours.toString();
  if (parsedHours.length === 1) parsedHours = "0" + parsedHours;
  return (
    <StyledBigWrapper>
      <StyledWrapper error={error} {...props} onPress={onPress}>
        <StyledText>{`${parsedHours} : ${parsedMinutes}`}</StyledText>
      </StyledWrapper>
      {error && <StyledErrorText>{error}</StyledErrorText>}
    </StyledBigWrapper>
  );
};

export default CountdownTimeDisplay;
