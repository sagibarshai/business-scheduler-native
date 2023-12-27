import React, { useEffect, useRef, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import TextInput from "../../../components/inputs/text";
import Dropdown from "../../../components/inputs/dropdown";
import Progressbar from "../../../components/progress-bar";
import SelectDaysAndHours from "./select-days-and-hours";
import NextStageButton from "../../../components/inputs/buttons/next-stage-button";

import { theme } from "../../../../theme";
import { type Days, days } from "../../../components/select-days";
import { addressErrorMessage, categoryErrorMessage, daysAndHoursErrorMessage, editModeErrorMessage, nameErrorMessage } from "./errors/messages";

import { StyledDaysLabel, StyledDaysAndLabelWrapper, StyledLabelIconWrapper, StyledStage1Subtitle, StyledStage1Title, StyledStage1ScrollableView, StyledStage1Wrapper, StyledStage1Content } from "./styled";

import { type TextInputChangeEventData } from "react-native";
import { type SelectedHoursAndDays } from "./select-days-and-hours/types";
import { type NativeSyntheticEvent } from "react-native";
import { type InputState } from "./types";
import { ScrollView } from "react-native";
import { View } from "react-native";

// stage 1 on figma (business owner add business name, business location, working hours and days of work and business category)

const Stage1 = () => {
  const [selectedDays, setSelectedDays] = useState<Days>(days);
  const [fromSubmitErrors, setFormSubmitErrors] = useState<string[] | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<InputState<string>>({ isActive: false, isVisited: false, value: "", error: categoryErrorMessage });
  const [businessName, setBusinessName] = useState<InputState<string>>({ isActive: false, isVisited: false, value: "", error: nameErrorMessage });
  const [businessAddress, setBusinessAddress] = useState<InputState<string>>({ isActive: false, isVisited: false, value: "", error: addressErrorMessage });
  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<InputState<SelectedHoursAndDays>>({ error: daysAndHoursErrorMessage, isActive: false, isVisited: false, isEditMode: false, value: [] });

  const scrollableRef = useRef<ScrollView>(null);

  const onToggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

  const onSelectCategory = (selectedCategory: string) => setCategory({ ...category, value: selectedCategory, error: "", isActive: false });

  const onInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, filed: "address" | "name") => {
    const value = event.nativeEvent.text;
    if (filed === "name") {
      let error = "";
      if (value.length < 2) error = nameErrorMessage;
      else error = "";
      setBusinessName({ ...businessName, value, error });
    } else {
      let error = "";
      if (value.length <= 8) error = addressErrorMessage;
      else error = "";
      setBusinessAddress({ ...businessAddress, value: event.nativeEvent.text, error });
    }
  };
  const onSubmitDaysAndHours = (data: SelectedHoursAndDays) => setSelectedDaysAndHours({ ...selectedDaysAndHours, value: data, error: "", isEditMode: false });

  const onBlur = (filed: "address" | "name") => (filed === "address" ? setBusinessAddress({ ...businessAddress, isActive: false }) : setBusinessName({ ...businessName, isActive: false }));
  const onFocus = (filed: "address" | "name") => (filed === "address" ? setBusinessAddress({ ...businessAddress, isActive: true, isVisited: true }) : setBusinessName({ ...businessName, isActive: true, isVisited: true }));

  const checkFormValidity = () => {
    let errs = [];
    if (businessAddress.error) errs.push(businessAddress.error);
    if (businessName.error) errs.push(businessName.error);
    if (!selectedDaysAndHours.value.length) errs.push(selectedDaysAndHours.error);
    if (selectedDaysAndHours.isEditMode) {
      errs.push(editModeErrorMessage);
      setSelectedDaysAndHours({ ...selectedDaysAndHours, error: editModeErrorMessage });
    }
    if (!category.value) errs.push(category.error);
    setFormSubmitErrors(errs);

    if (errs.length > 0) return errs;
    return null;
  };
  const onNextStage = () => {
    setIsFormSubmitted(true);
    const errs = checkFormValidity();

    // console.log(errs);
    if (errs) {
      return;
    }
    // console.log("move to next stage !");
  };
  useEffect(() => {
    const errorsNavigation = () => {
      if (scrollableRef.current) {
        if (fromSubmitErrors?.length) {
          if (fromSubmitErrors?.length === 1 && selectedDaysAndHours.error) scrollableRef.current.scrollToEnd({ animated: true });
          else scrollableRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
      }
    };
    errorsNavigation();
  }, [fromSubmitErrors]);

  const onEditDaysAndHours = () => {
    setSelectedDaysAndHours({ ...selectedDaysAndHours, isEditMode: true });
    if (fromSubmitErrors) {
      setFormSubmitErrors([...fromSubmitErrors, editModeErrorMessage]);
    } else setFormSubmitErrors([editModeErrorMessage]);
  };

  return (
    <StyledStage1Wrapper onTouchEnd={() => isCategoryOpen && onToggleCategoryDropdown()}>
      <ScrollView ref={scrollableRef} contentContainerStyle={{ flexGrow: 1 }}>
        <StyledStage1Content>
          <Progressbar currentStage={1} stages={5} />
          <StyledStage1Title>כניסה למערכת</StyledStage1Title>
          <StyledStage1Subtitle>נראה שאין לכם עדיין פרופיל, בואו נתחיל</StyledStage1Subtitle>
          <Dropdown error={isFormSubmitted ? category.error : ""} option={category.value || "כאן בוחרים קטגוריה"} onSelect={onSelectCategory} isOpen={isCategoryOpen} onToggle={onToggleCategoryDropdown} options={["מספרה", "כושר ותזונה", "לק גל"]} />
          <TextInput onBlur={() => onBlur("name")} onFocus={() => onFocus("name")} error={isFormSubmitted ? businessName.error : ""} onChange={(event) => onInputChange(event, "name")} label="שם העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />} />
          <TextInput onBlur={() => onBlur("address")} onFocus={() => onFocus("address")} error={isFormSubmitted ? businessAddress.error : ""} onChange={(event) => onInputChange(event, "address")} label="כתובת העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />
          <StyledDaysAndLabelWrapper>
            <StyledLabelIconWrapper>
              <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
              <StyledDaysLabel>ימים ושעות</StyledDaysLabel>
            </StyledLabelIconWrapper>
            <SelectDaysAndHours error={isFormSubmitted ? selectedDaysAndHours.error : ""} selectedDaysAndHours={selectedDaysAndHours.value} onEditMode={onEditDaysAndHours} onSubmitDaysAndHours={onSubmitDaysAndHours} days={selectedDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
          </StyledDaysAndLabelWrapper>
        </StyledStage1Content>
      </ScrollView>
      <NextStageButton disabled={false} onNextStage={onNextStage}>
        לשלב הבא
      </NextStageButton>
    </StyledStage1Wrapper>
  );
};
export default Stage1;
