import styled from 'styled-components/native';
import RTLText from '../RTL/text';
import Day from '../select-day';
import {StyledDaysWrapper} from './styled';

export type Days = {
  name: string;
  selected: boolean;
}[];
interface Props {
  selectedDays: Days;
  setSelectedDays: React.Dispatch<React.SetStateAction<Days>>;
  days: Days;
}

const SelectDays = ({selectedDays, setSelectedDays, days}: Props) => {
  const onToggleDay = (day: string) => {
    const updatedDays = [...days];
    const dayIndex = updatedDays.findIndex(d => d.name === day);
    const existingDay = updatedDays[dayIndex];
    if (!existingDay) return;
    existingDay.selected = !existingDay.selected;
    updatedDays[dayIndex] = existingDay;
    setSelectedDays(updatedDays);
  };

  return (
    <>
      <StyledDaysWrapper>
        {selectedDays.map(day => (
          <Day
            key={day.name}
            onTouch={() => onToggleDay(day.name)}
            dayText={day.name}
            selected={day.selected}
          />
        ))}
      </StyledDaysWrapper>
    </>
  );
};
export default SelectDays;
