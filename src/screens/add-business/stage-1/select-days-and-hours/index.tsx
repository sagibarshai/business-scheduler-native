import {Text} from 'react-native';
import SelectDays, {Days} from '../../../../components/select-days';
import SelectTime from '../../../../components/select-time';
import {
  StyledSelectTimeWrapper,
  StyledTimeWrapper,
  StyledWrapper,
  StyledTimeSaveButton,
  StyledTimeSaveButtonText,
} from './styled';

interface Props {
  selectedDays: Days;
  setSelectedDays: React.Dispatch<React.SetStateAction<Days>>;
  days: Days;
}

const SelectDaysAndHours = ({selectedDays, setSelectedDays, days}: Props) => {
  return (
    <StyledWrapper>
      <SelectDays
        days={days}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <StyledSelectTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime defaultValue="08:00" labelText="שעות פתיחה" />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime defaultValue="17:00" labelText="עד מתי?" />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <StyledTimeSaveButton>
            <StyledTimeSaveButtonText>הוספה</StyledTimeSaveButtonText>
          </StyledTimeSaveButton>
        </StyledTimeWrapper>
      </StyledSelectTimeWrapper>
    </StyledWrapper>
  );
};
export default SelectDaysAndHours;
