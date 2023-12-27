import Day from "../select-day";

import { type Days, type Props } from "./types";

import { StyledDaysWrapper } from "./styled";

export const days: Days = [
  { name: "א", selected: false, disabled: false, longName: "ראשון" },
  { name: "ב", selected: false, disabled: false, longName: "שני" },
  { name: "ג", selected: false, disabled: false, longName: "שלישי" },
  { name: "ד", selected: false, disabled: false, longName: "רביעי" },
  { name: "ה", selected: false, disabled: false, longName: "חמישי" },
  { name: "ו", selected: false, disabled: false, longName: "שישי" },
  { name: "ש", selected: false, disabled: false, longName: "שבת" },
];

const SelectDays = ({ selectedDays, setSelectedDays, days }: Props) => {
  const onToggleDay = (day: string) => {
    const updatedDays = [...days];
    const dayIndex = updatedDays.findIndex((d) => d.name === day);
    const existingDay = updatedDays[dayIndex];
    if (!existingDay) return;
    existingDay.selected = !existingDay.selected;
    updatedDays[dayIndex] = existingDay;
    setSelectedDays(updatedDays);
  };

  return (
    <>
      <StyledDaysWrapper>
        {selectedDays.map((day) => (
          <Day disabled={day.disabled} key={day.name} onTouch={() => onToggleDay(day.name)} dayText={day.name} selected={day.selected} />
        ))}
      </StyledDaysWrapper>
    </>
  );
};
export default SelectDays;
