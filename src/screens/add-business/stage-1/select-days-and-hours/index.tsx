import SelectDays, {Days} from '../../../../components/select-days';
import SelectTime, {Role} from '../../../../components/select-time';

import {
  StyledSelectTimeWrapper,
  StyledTimeWrapper,
  StyledWrapper,
  StyledTimeSaveButton,
  StyledTimeSaveButtonText,
  StyledDaysAndHoursDisplayWrapper,
  StyledRow,
  StyledText,
} from './styled';
import {useState} from 'react';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';

interface Props {
  selectedDays: Days;
  setSelectedDays: React.Dispatch<React.SetStateAction<Days>>;
  days: Days;
}
const now = new Date();
let dateWithTime10: Date = new Date(now.setHours(10, 0, 0));
let dateWithTime18: Date = new Date(now.setHours(18, 0, 0));

const SelectDaysAndHours = ({selectedDays, setSelectedDays, days}: Props) => {
  const [startHour, setStartHour] = useState<Date>(dateWithTime10);
  const [endHour, setEndHour] = useState<Date>(dateWithTime18);
  const [parseStartHour, setParseStartHour] = useState<string>('10:00');
  const [parseEndHour, setParseEndHour] = useState<string>('18:00');
  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<
    {days: Days; from: string; to: string}[]
  >([]);
  const [errors, setErrors] = useState<{message: string; filed: string}[]>();

  const onSaveWorkingHours = (event: DateTimePickerEvent, role: Role) => {
    const date = new Date(event.nativeEvent.timestamp);
    const time = date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Jerusalem',
    });

    const splitTime = time.split(':');
    const fTime = splitTime[0] + ':' + splitTime[1];
    if (role === 'from') {
      setParseStartHour(fTime);
      setStartHour(date);
    } else {
      setParseEndHour(fTime);
      setEndHour(date);
    }
  };

  const checkIfFormIsValid = () => {};

  const onSaveWorkingDaysAndHours = () => {
    const updatedRows = [...selectedDaysAndHours];
    updatedRows.push({
      days: days.filter(day => (day.selected ? day : false)),
      from: parseStartHour,
      to: parseEndHour,
    });

    const updatedDays = [...selectedDays];
    for (let day of selectedDays) {
      if (day.selected) day.disabled = true;
    }
    setSelectedDays(updatedDays);
    setSelectedDaysAndHours(updatedRows);
  };

  return (
    <StyledWrapper>
      <SelectDays
        days={days}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <StyledSelectTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime
            role="from"
            defaultValue={startHour as Date}
            onChange={onSaveWorkingHours}
            labelText="שעות פתיחה"
          />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime
            onChange={onSaveWorkingHours}
            defaultValue={endHour as Date}
            role="to"
            labelText="עד מתי?"
          />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <StyledTimeSaveButton onPress={onSaveWorkingDaysAndHours}>
            <StyledTimeSaveButtonText>הוספה</StyledTimeSaveButtonText>
          </StyledTimeSaveButton>
        </StyledTimeWrapper>
      </StyledSelectTimeWrapper>
      <StyledDaysAndHoursDisplayWrapper>
        {selectedDaysAndHours.map((row, dayIndex) => (
          <StyledRow key={dayIndex}>
            {row.days.map(day => (
              <StyledText key={day.name}>
                {day.name}
                {' , '}
              </StyledText>
            ))}
            <StyledText>מהשעה {row.from}</StyledText>
            <StyledText>עד השעה {row.to}</StyledText>
          </StyledRow>
        ))}
      </StyledDaysAndHoursDisplayWrapper>
    </StyledWrapper>
  );
};
export default SelectDaysAndHours;
