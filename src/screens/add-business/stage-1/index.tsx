import TextInput from "../../../components/inputs/text";
import { Dropdown } from "../../../components/inputs/dropdown";
import { StyledDaysLabel, StyledDaysAndLabelWrapper, StyledLabelIconWrapper, StyledStage1Subtitle, StyledStage1Title, StyledStage1ScrollableView, StyledStage1Wrapper, StyledStage1Content } from "./styled";
import Progressbar from "../../../components/progress-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../theme";
import { TextInput as TextInputType, TextInputChangeEventData } from "react-native";
import { useRef, useState } from "react";
import { Days } from "../../../components/select-days";
import SelectDaysAndHours from "./select-days-and-hours";
import NextStageButton from "../../../components/inputs/buttons/next-stage-button";
import { NativeSyntheticEvent } from "react-native";
// stage 1 on figma (business owner add business name, business location, working hours and days of work and business category)

const days: Days = [
  { name: "א", selected: false, disabled: false, longName: "ראשון" },
  { name: "ב", selected: false, disabled: false, longName: "שני" },
  { name: "ג", selected: false, disabled: false, longName: "שלישי" },
  { name: "ד", selected: false, disabled: false, longName: "רביעי" },
  { name: "ה", selected: false, disabled: false, longName: "חמישי" },
  { name: "ו", selected: false, disabled: false, longName: "שישי" },
  { name: "ש", selected: false, disabled: false, longName: "שבת" },
];

const Stage1 = () => {
  const [selectedDays, setSelectedDays] = useState<Days>(days);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [businessName, setBusinessName] = useState<string>("");
  const [businessAddress, setBusinessAddress] = useState<string>("");

  const onToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, filed: "address" | "name") => {
    if (filed === "name") {
      setBusinessName(event.nativeEvent.text);
    } else {
      setBusinessAddress(event.nativeEvent.text);
    }
  };

  return (
    <StyledStage1Wrapper onTouchEnd={() => isDropdownOpen && onToggleDropdown()}>
      <StyledStage1ScrollableView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledStage1Content>
          <Progressbar currentStage={1} stages={5} />
          <StyledStage1Title>כניסה למערכת</StyledStage1Title>
          <StyledStage1Subtitle>נראה שאין לכם עדיין פרופיל, בואו נתחיל</StyledStage1Subtitle>
          <Dropdown isOpen={isDropdownOpen} onToggle={onToggleDropdown} options={["מספרה", "כושר ותזונה", "לק גל", "הההגמספרה", "כושר ותכגכגזונה", "לקכגגכ גל", "מdsdsספרה", "כושר ותזdssdונה", "לdsdsdsק גל", "ההdsdsהגמספרה", "כושר dsds", "לקכגגכ גלdsds"]} />
          <TextInput onChange={(event) => onInputChange(event, "name")} label="שם העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />} />
          <TextInput onChange={(event) => onInputChange(event, "address")} label="כתובת העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />

          <StyledDaysAndLabelWrapper>
            <StyledLabelIconWrapper>
              <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
              <StyledDaysLabel>ימים ושעות</StyledDaysLabel>
            </StyledLabelIconWrapper>
            <SelectDaysAndHours days={selectedDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
          </StyledDaysAndLabelWrapper>
        </StyledStage1Content>
      </StyledStage1ScrollableView>
      <NextStageButton disabled={false} onNextStage={() => {}}>
        לשלב הבא
      </NextStageButton>
    </StyledStage1Wrapper>
  );
};
export default Stage1;
