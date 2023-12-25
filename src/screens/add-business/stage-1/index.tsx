import { useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import TextInput from "../../../components/inputs/text";
import Dropdown from "../../../components/inputs/dropdown";
import Progressbar from "../../../components/progress-bar";
import SelectDaysAndHours from "./select-days-and-hours";
import NextStageButton from "../../../components/inputs/buttons/next-stage-button";

import { theme } from "../../../../theme";
import { type Days, days } from "../../../components/select-days";
import { addressErrorMessage, daysAndHoursErrorMessage, nameErrorMessage } from "./errors/messages";

import { StyledDaysLabel, StyledDaysAndLabelWrapper, StyledLabelIconWrapper, StyledStage1Subtitle, StyledStage1Title, StyledStage1ScrollableView, StyledStage1Wrapper, StyledStage1Content } from "./styled";

import { type TextInputChangeEventData } from "react-native";
import { type SelectedHoursAndDays } from "./select-days-and-hours/types";
import { type NativeSyntheticEvent } from "react-native";
import { InputState } from "./types";

// stage 1 on figma (business owner add business name, business location, working hours and days of work and business category)

const Stage1 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [category, setCategory] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<Days>(days);

  const [businessName, setBusinessName] = useState<InputState>({
    isActive: false,
    isVisited: false,
    value: "",
    error: nameErrorMessage,
  });
  const [businessAddress, setBusinessAddress] = useState<InputState>({
    isActive: false,
    isVisited: false,
    value: "",
    error: addressErrorMessage,
  });

  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<SelectedHoursAndDays>([]);

  const [fromSubmitErrors, setFormSubmitErrors] = useState<string[] | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onToggleCategoryDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onSelectCategory = (option: string) => {
    setCategory(option);
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
    if (!selectedDaysAndHours.length) {
      errs.push(daysAndHoursErrorMessage);
    }
    if (errs.length > 0) return errs;
    return null;
  };

  const onNextStage = () => {
    setIsFormSubmitted(true);
    const errs = checkFormValidity();
    setFormSubmitErrors(errs);
    if (errs) {
      console.log("cannot move stage !");
      return;
    }
    console.log("move to next stage !");
  };

  return (
    <StyledStage1Wrapper onTouchEnd={() => isDropdownOpen && onToggleCategoryDropdown()}>
      <StyledStage1ScrollableView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledStage1Content>
          <Progressbar currentStage={1} stages={5} />
          <StyledStage1Title>כניסה למערכת</StyledStage1Title>
          <StyledStage1Subtitle>נראה שאין לכם עדיין פרופיל, בואו נתחיל</StyledStage1Subtitle>
          <Dropdown option={category || "כאן בוחרים קטגוריה"} onSelect={onSelectCategory} isOpen={isDropdownOpen} onToggle={onToggleCategoryDropdown} options={["מספרה", "כושר ותזונה", "לק גל"]} />
          <TextInput onBlur={() => onBlur("name")} onFocus={() => onFocus("name")} error={businessName.isActive || !businessName.isVisited ? null : businessName.error} onChange={(event) => onInputChange(event, "name")} label="שם העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />} />
          <TextInput onBlur={() => onBlur("address")} onFocus={() => onFocus("address")} error={businessAddress.isActive || !businessAddress.isVisited ? null : businessAddress.error} onChange={(event) => onInputChange(event, "address")} label="כתובת העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />
          <StyledDaysAndLabelWrapper>
            <StyledLabelIconWrapper>
              <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
              <StyledDaysLabel>ימים ושעות</StyledDaysLabel>
            </StyledLabelIconWrapper>
            <SelectDaysAndHours isValid={isFormSubmitted ? Boolean(selectedDaysAndHours.length) : true} error={daysAndHoursErrorMessage} selectedDaysAndHours={selectedDaysAndHours} setSelectedDaysAndHours={setSelectedDaysAndHours} days={selectedDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
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
