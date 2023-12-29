import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import TextInput from "../../../components/inputs/text";
import Dropdown from "../../../components/inputs/dropdown";
import Progressbar from "../../../components/progress-bar";
import SelectDaysAndHours from "./select-days-and-hours";
import NextStageButton from "../../../components/inputs/buttons/next-stage-button";

import { theme } from "../../../../theme";
import { days } from "../../../components/select-days";
import { addressErrorMessage, categoryErrorMessage, daysAndHoursErrorMessage, editModeErrorMessage, nameErrorMessage } from "./errors/messages";

import { StyledDaysLabel, StyledDaysAndLabelWrapper, StyledLabelIconWrapper, StyledStage1Subtitle, StyledStage1Title, StyledStage1Wrapper, StyledStage1Content } from "./styled";

import { type TextInputChangeEventData } from "react-native";
import { ReduxSelectedHoursAndDays, type SelectedHoursAndDays } from "./select-days-and-hours/types";
import { type NativeSyntheticEvent } from "react-native";
import { type InputState } from "./types";
import { type Days } from "../../../components/select-days/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "../../../../redux/store";
import { setBusinessMetaData } from "../../../../redux/featuers/business/businessSlice";

// stage 1 on figma (business owner add business name, business location, working hours and days of work and business category)

const Stage1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();

  const [selectedDays, setSelectedDays] = useState<Days>(days);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<InputState<string>>({ value: "", error: categoryErrorMessage, isEditMode: false });
  const [businessName, setBusinessName] = useState<InputState<string>>({ value: "", error: nameErrorMessage, isEditMode: false });
  const [businessAddress, setBusinessAddress] = useState<InputState<string>>({ value: "", error: addressErrorMessage, isEditMode: false });
  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<InputState<SelectedHoursAndDays>>({ error: daysAndHoursErrorMessage, isEditMode: false, value: [] });

  const scrollableRef = useRef<ScrollView>(null);

  // category
  const onSelectCategory = (selectedCategory: string) => setCategory({ ...category, value: selectedCategory, error: "", isEditMode: false });

  const onToggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (!isCategoryOpen) setCategory({ ...category, isEditMode: true });
  };

  // days and hours
  const onEditDaysAndHours = () => setSelectedDaysAndHours({ ...selectedDaysAndHours, isEditMode: true, error: "" });

  const onSubmitDaysAndHours = (data: SelectedHoursAndDays) => {
    setSelectedDaysAndHours({ ...selectedDaysAndHours, value: data, error: "", isEditMode: false });
    if (scrollableRef.current) {
      scrollableRef.current.scrollToEnd();
    }
  };
  // inputs
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

  const onInputToggleEditMode = (filed: "name" | "address") => {
    if (filed === "name") {
      setBusinessName({ ...businessName, isEditMode: !businessName.isEditMode });
    } else if (filed === "address") {
      setBusinessAddress({ ...businessAddress, isEditMode: !businessAddress.isEditMode });
    }
  };

  // form
  const checkFormValidity = () => {
    let errs = [];
    if (businessAddress.error) errs.push(businessAddress.error);
    if (businessName.error) errs.push(businessName.error);
    if (!category.value) errs.push(category.error);
    if (!selectedDaysAndHours.value.length) errs.push(selectedDaysAndHours.error);
    else if (selectedDaysAndHours.isEditMode) {
      errs.push(editModeErrorMessage);
      // set this error only on submit !
      setSelectedDaysAndHours({ ...selectedDaysAndHours, error: editModeErrorMessage });
    }
    if (errs.length > 0) return errs;
    return null;
  };

  const onNextStage = () => {
    setIsFormSubmitted(true);
    const errs = checkFormValidity();

    if (errs) {
      errorsNavigation(errs);
      return;
    }

    handleNavigation();
  };

  const handleNavigation = async () => {
    const dispatchPromise = new Promise<void>((resolve) => {
      dispatch(
        setBusinessMetaData({
          address: businessAddress.value,
          name: businessName.value,
          workingDaysAndHours: selectedDaysAndHours.value.map((item) => ({
            days: item.days,
            from: item.from,
            to: item.to,
            editMode: item.editMode,
            startHour: item.startHour.toString(),
            endHour: item.endHour.toString(),
          })),

          category: category.value,
        })
      );
      resolve();
    });

    // Wait for the dispatchPromise to resolve before navigating to "stage-2"
    await dispatchPromise;

    navigation.navigate("stage-2");
  };

  const errorsNavigation = (errs: string[]) => {
    if (scrollableRef.current) {
      if (errs?.length) {
        if (errs?.length === 1 && selectedDaysAndHours.error) scrollableRef.current.scrollToEnd({ animated: true });
        else scrollableRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  };

  return (
    <StyledStage1Wrapper onTouchEnd={() => isCategoryOpen && onToggleCategoryDropdown()}>
      <ScrollView ref={scrollableRef} contentContainerStyle={{ flexGrow: 1 }}>
        <StyledStage1Content>
          <Progressbar currentStage={1} stages={5} />
          <StyledStage1Title>כניסה למערכת</StyledStage1Title>
          <StyledStage1Subtitle>נראה שאין לכם עדיין פרופיל, בואו נתחיל</StyledStage1Subtitle>
          <Dropdown error={isFormSubmitted && !category.isEditMode ? category.error : ""} option={category.value || "כאן בוחרים קטגוריה"} onSelect={onSelectCategory} isOpen={isCategoryOpen} onToggle={onToggleCategoryDropdown} options={["מספרה", "כושר ותזונה", "לק גל"]} />
          <TextInput onFocus={() => onInputToggleEditMode("name")} onBlur={() => onInputToggleEditMode("name")} error={isFormSubmitted ? businessName.error : ""} onChange={(event) => onInputChange(event, "name")} label="שם העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />} />
          <TextInput onFocus={() => onInputToggleEditMode("address")} onBlur={() => onInputToggleEditMode("address")} error={isFormSubmitted ? businessAddress.error : ""} onChange={(event) => onInputChange(event, "address")} label="כתובת העסק" icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />} />
          <StyledDaysAndLabelWrapper>
            <StyledLabelIconWrapper>
              <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
              <StyledDaysLabel>ימים ושעות</StyledDaysLabel>
            </StyledLabelIconWrapper>
            <SelectDaysAndHours error={isFormSubmitted && (selectedDaysAndHours.isEditMode || selectedDaysAndHours.error) ? selectedDaysAndHours.error : ""} selectedDaysAndHours={selectedDaysAndHours.value} onEditMode={onEditDaysAndHours} onSubmitDaysAndHours={onSubmitDaysAndHours} days={selectedDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
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
