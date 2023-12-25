import TextInput from "../../../components/inputs/text";
import { Dropdown } from "../../../components/inputs/dropdown";
import { StyledDaysLabel, StyledDaysAndLabelWrapper, StyledLabelIconWrapper, StyledStage1Subtitle, StyledStage1Title, StyledStage1ScrollableView, StyledStage1Wrapper, StyledStage1Content } from "./styled";
import Progressbar from "../../../components/progress-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../theme";
import { TextInput as TextInputType, TextInputChangeEventData } from "react-native";
import { useState } from "react";
import { Days } from "../../../components/select-days";
import SelectDaysAndHours from "./select-days-and-hours";
import NextStageButton from "../../../components/inputs/buttons/next-stage-button";
import { NativeSyntheticEvent } from "react-native";
import { SelectedHoursAndDays } from "./select-days-and-hours/types";
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

const addressErrorMessage = "כתובת העסק לא תקינה";
const nameErrorMessage = "שם העסק לא תקין";
const daysAndHoursErrorMessage = "לא נבחרו שום ימים בו העסק עובד";

const Stage1 = () => {
  const [selectedDays, setSelectedDays] = useState<Days>(days);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [businessName, setBusinessName] = useState<{
    isVisited: boolean;
    isActive: boolean;
    value: string;
    error: string | null;
  }>({
    isActive: false,
    isVisited: false,
    value: "",
    error: nameErrorMessage,
  });
  const [businessAddress, setBusinessAddress] = useState<{
    isVisited: boolean;
    isActive: boolean;
    value: string;
    error: string | null;
  }>({
    isActive: false,
    isVisited: false,
    value: "",
    error: addressErrorMessage,
  });
  const [errors, setErrors] = useState<string[] | null>(null);
  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<SelectedHoursAndDays>([]);

  const onToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, filed: "address" | "name") => {
    const value = event.nativeEvent.text;
    if (filed === "name") {
      let error = null;
      if (value.length < 2) error = nameErrorMessage;
      else error = null;
      setBusinessName({ ...businessName, value, error });
    } else {
      let error = null;
      if (value.length <= 8) error = addressErrorMessage;
      else error = null;
      setBusinessAddress({ ...businessAddress, value: event.nativeEvent.text, error });
    }
  };
  const onBlur = (filed: "address" | "name") => (filed === "address" ? setBusinessAddress({ ...businessAddress, isActive: false }) : setBusinessName({ ...businessName, isActive: false }));
  const onFocus = (filed: "address" | "name") => (filed === "address" ? setBusinessAddress({ ...businessAddress, isActive: true, isVisited: true }) : setBusinessName({ ...businessName, isActive: true, isVisited: true }));

  const checkFormValidity = () => {
    let errs = [];
    if (businessAddress.error) errs.push(businessAddress.error);
    if (businessName.error) errs.push(businessName.error);
    if (!selectedDaysAndHours.length) errs.push(daysAndHoursErrorMessage);
    if (errs.length > 0) return errs;
    return null;
  };

  const onNextStage = () => {
    const errs = checkFormValidity();
    setErrors(errs);
    if (errs) {
      console.log("cannot move stage !");
      return;
    }
    console.log("move to next stage !");
  };

  return (
    <StyledStage1Wrapper onTouchEnd={() => isDropdownOpen && onToggleDropdown()}>
      <StyledStage1ScrollableView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledStage1Content>
          <Progressbar currentStage={1} stages={5} />
          <StyledStage1Title>כניסה למערכת</StyledStage1Title>
          <StyledStage1Subtitle>נראה שאין לכם עדיין פרופיל, בואו נתחיל</StyledStage1Subtitle>
          <Dropdown isOpen={isDropdownOpen} onToggle={onToggleDropdown} options={["מספרה", "כושר ותזונה", "לק גל", "הההגמספרה", "כושר ותכגכגזונה", "לקכגגכ גל", "מdsdsספרה", "כושר ותזdssdונה", "לdsdsdsק גל", "ההdsdsהגמספרה", "כושר dsds", "לקכגגכ גלdsds"]} />
          <TextInput onBlur={() => onBlur("name")} onFocus={() => onFocus("name")} error={businessName.isActive || !businessName.isVisited ? null : businessName.error} onChange={(event) => onInputChange(event, "name")} label="שם העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />} />
          <TextInput onBlur={() => onBlur("address")} onFocus={() => onFocus("address")} error={businessAddress.isActive || !businessAddress.isVisited ? null : businessAddress.error} onChange={(event) => onInputChange(event, "address")} label="כתובת העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />

          <StyledDaysAndLabelWrapper>
            <StyledLabelIconWrapper>
              <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
              <StyledDaysLabel>ימים ושעות</StyledDaysLabel>
            </StyledLabelIconWrapper>
            <SelectDaysAndHours selectedDaysAndHours={selectedDaysAndHours} setSelectedDaysAndHours={setSelectedDaysAndHours} days={selectedDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
          </StyledDaysAndLabelWrapper>
        </StyledStage1Content>
      </StyledStage1ScrollableView>
      <NextStageButton disabled={false} onNextStage={onNextStage}>
        לשלב הבא
      </NextStageButton>
    </StyledStage1Wrapper>
  );
};
export default Stage1;
