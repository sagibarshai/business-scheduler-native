import TimePicker from '@react-native-community/datetimepicker';
import {
  StyledLabel,
  StyledSelectTimeWrapper,
  StyledTimeButton,
  StyledTimeText,
} from './styled';
import {useState} from 'react';

interface Props {
  labelText: string;
  defaultValue: string;
}
const SelectTime = ({labelText, defaultValue}: Props) => {
  return (
    <StyledSelectTimeWrapper>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledTimeButton>
        <TimePicker minuteInterval={15} mode="time" value={new Date()} />
      </StyledTimeButton>
    </StyledSelectTimeWrapper>
  );
};
export default SelectTime;
