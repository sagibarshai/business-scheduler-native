import TimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  StyledLabel,
  StyledSelectTimeWrapper,
  StyledTimeButton,
  StyledTimeText,
} from './styled';

export type Role = 'from' | 'to';

interface Props {
  labelText: string;
  defaultValue: Date;
  onChange?: (event: DateTimePickerEvent, role: Role) => void;
  role: Role;
}
const SelectTime = ({
  labelText,
  defaultValue,
  role,
  onChange = () => {},
}: Props) => {
  return (
    <StyledSelectTimeWrapper>
      <StyledLabel>{labelText}</StyledLabel>
      {/* <StyledTimeButton>
        <StyledTimeText>{defaultValue}</StyledTimeText>
      </StyledTimeButton> */}
      <TimePicker
        id={labelText}
        onChange={event => onChange(event, role)}
        minuteInterval={15}
        mode="time"
        value={defaultValue}
      />
    </StyledSelectTimeWrapper>
  );
};
export default SelectTime;
