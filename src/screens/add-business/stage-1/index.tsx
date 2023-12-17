import TextInput from '../../../components/inputs/text';
import {Dropdown} from '../../../components/inputs/dropdown';
import {
  StyledDaysLabel,
  StyledDaysAndLabelWrapper,
  StyledLabelIconWrapper,
  StyledStage1,
  StyledStage1Subtitle,
  StyledStage1Title,
} from './styled';
import Progressbar from '../../../components/progress-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../../theme';
import {ScrollView} from 'react-native';
import {useState} from 'react';
import {Days} from '../../../components/select-days';
import SelectDaysAndHours from './select-days-and-hours';
// stage 1 on figma (business owner add business name, business location, working hours and days of work and business category)

const days: Days = [
  {name: 'א', selected: false},
  {name: 'ב', selected: false},
  {name: 'ג', selected: false},
  {name: 'ד', selected: false},
  {name: 'ה', selected: false},
  {name: 'ו', selected: false},
  {name: 'ש', selected: false},
];

const Stage1 = () => {
  const [selectedDays, setSelectedDays] = useState<Days>(days);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <ScrollView>
      <StyledStage1 onTouchEnd={() => isDropdownOpen && onToggleDropdown()}>
        <Progressbar currentStage={1} stages={5} />
        <StyledStage1Title>כניסה למערכת</StyledStage1Title>
        <StyledStage1Subtitle>
          נראה שאין לכם עדיין פרופיל, בואו נתחיל
        </StyledStage1Subtitle>
        <Dropdown
          isOpen={isDropdownOpen}
          onToggle={onToggleDropdown}
          options={['מספרה', 'כושר ותזונה', 'לק גל']}
        />
        <TextInput
          label="שם העסק"
          icon={
            <Icon
              size={theme.icons.sizes.m}
              color={theme.icons.colors.aqua}
              name="note-text-outline"
            />
          }
        />
        <TextInput
          label="כתובת העסק"
          icon={
            <Icon
              size={theme.icons.sizes.m}
              color={theme.icons.colors.aqua}
              name="home-outline"
            />
          }
        />

        <StyledDaysAndLabelWrapper>
          <StyledLabelIconWrapper>
            <Icon
              size={theme.icons.sizes.m}
              color={theme.icons.colors.aqua}
              name="clock-outline"
            />
            <StyledDaysLabel>שעות פתיחה</StyledDaysLabel>
          </StyledLabelIconWrapper>
          <SelectDaysAndHours
            days={selectedDays}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </StyledDaysAndLabelWrapper>
      </StyledStage1>
    </ScrollView>
  );
};
export default Stage1;
