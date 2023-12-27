import { type Props } from "./types";

import { StyledDayText, StyledDayWrapper } from "./styled";

const Day = ({ selected, dayText, onTouch, disabled }: Props) => {
  return (
    <StyledDayWrapper disabled={disabled} onTouchEnd={disabled ? () => {} : onTouch} selected={selected}>
      <StyledDayText disabled={disabled} selected={selected}>
        {dayText}
      </StyledDayText>
    </StyledDayWrapper>
  );
};

export default Day;
