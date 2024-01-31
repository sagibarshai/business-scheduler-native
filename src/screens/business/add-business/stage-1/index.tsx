import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import TextInput from "../../../../components/inputs/text";
import Dropdown from "../../../../components/inputs/dropdown";
import Progressbar from "../../../../components/progress-bar";
import SelectDaysAndHours from "./select-days-and-hours";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";

import { theme } from "../../../../../theme";
import { days } from "../../../../components/select-days";
import { TelErrorMessage, addressErrorMessage, categoryErrorMessage, daysAndHoursErrorMessage, editModeErrorMessage, nameErrorMessage } from "./errors/messages";

import { StyledDaysLabel, StyledDaysAndLabelWrapper, StyledLabelIconWrapper, StyledStage1Subtitle, StyledStage1Title, StyledStage1Wrapper, StyledStage1Content } from "./styled";

import { type TextInputChangeEventData } from "react-native";
import { type SelectedHoursAndDays } from "./select-days-and-hours/types";
import { type NativeSyntheticEvent } from "react-native";
import { type InputState } from "../../../../components/inputs/types";
import { type Days } from "../../../../components/select-days/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { setBusinessMetaData } from "../../../../../redux/featuers/business/businessSlice";
import SearchLocation from "../../../../components/search-location";
import TelInput from "../../../../components/inputs/tel";
import { isPhone } from "../../../../utils/valitators";
import { useRoute } from "@react-navigation/native";

// stage 1 on figma (business owner add business name, business location, working hours and days of work and business category)

const Stage1 = () => {
  const businessMetaData = useAppSelector((state) => state.business.metaData);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();

  const [selectedDays, setSelectedDays] = useState<Days>(days);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isSearchLocationOpen, setIsSearchLocationOpen] = useState<boolean>(false);

  const [categories, setCategories] = useState<InputState<string[]>>({ value: businessMetaData.categories, error: categoryErrorMessage, isEditMode: false });

  const [businessTel, setBusinessTel] = useState<InputState<string>>({ value: businessMetaData.phone, error: TelErrorMessage, isEditMode: false });
  const [businessName, setBusinessName] = useState<InputState<string>>({ value: businessMetaData.name, error: nameErrorMessage, isEditMode: false });
  const [businessAddress, setBusinessAddress] = useState<InputState<string>>({ value: businessMetaData.address, error: addressErrorMessage, isEditMode: false });
  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<InputState<SelectedHoursAndDays>>({
    error: daysAndHoursErrorMessage,
    isEditMode: false,
    value: businessMetaData.workingDaysAndHours,
  });

  const scrollableRef = useRef<ScrollView>(null);

  const route = useRoute();

  //TODO FIX TS
  //@ts-ignore
  const isEditMode = route.params?.editMode;

  // category
  const onSelectCategory = (selectedCategory: string) => {
    const isExist = categories.value.find((category) => category === selectedCategory);
    let updatedCategories: string[] = [];
    if (isExist) {
      updatedCategories = categories.value.filter((category) => category !== selectedCategory);
    } else {
      updatedCategories = [...categories.value, selectedCategory];
    }
    setCategories({ ...categories, value: updatedCategories, error: "", isEditMode: false });
  };

  const onToggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
    if (!isCategoryOpen) setCategories({ ...categories, isEditMode: true });
  };
  const onToggleSearchLocation = () => {
    setIsSearchLocationOpen(!isSearchLocationOpen);
    if (!isCategoryOpen) setBusinessAddress({ ...businessAddress, isEditMode: true });
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
  const onInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, filed: "name" | "tel") => {
    const value = event.nativeEvent.text;
    if (filed === "name") {
      let error = "";
      if (value.length < 2) error = nameErrorMessage;
      else error = "";
      setBusinessName({ ...businessName, value, error });
    } else if (filed === "tel") {
      let error = "";
      if (!isPhone(value)) error = TelErrorMessage;
      else error = "";
      setBusinessTel({ ...businessTel, value, error });
    }
  };

  const onInputToggleEditMode = (filed: "name" | "address" | "tel") => {
    if (filed === "name") {
      setBusinessName({ ...businessName, isEditMode: !businessName.isEditMode });
    } else if (filed === "address") {
      setBusinessAddress({ ...businessAddress, isEditMode: !businessAddress.isEditMode });
    } else if (filed === "tel") {
      setBusinessTel({ ...businessTel, isEditMode: !businessTel.isEditMode });
    }
  };

  // form
  const checkFormValidity = () => {
    let errs = [];
    if (businessAddress.error) errs.push(businessAddress.error);
    if (businessName.error) errs.push(businessName.error);
    if (!categories.value.length) errs.push(categories.error);
    if (!selectedDaysAndHours.value.length) errs.push(selectedDaysAndHours.error);
    if (businessTel.error) errs.push(businessTel.error);
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
          workingDaysAndHours: selectedDaysAndHours.value,
          categories: categories.value,
          phone: businessTel.value,
        })
      );
      resolve();
    });

    // Wait for the dispatchPromise to resolve before navigating to "stage-2"
    await dispatchPromise;

    isEditMode ? navigation.navigate("business-profile") : navigation.navigate("stage-2");
  };

  const errorsNavigation = (errs: string[]) => {
    if (scrollableRef.current) {
      if (errs?.length) {
        if (errs?.length === 1 && selectedDaysAndHours.error) scrollableRef.current.scrollToEnd({ animated: true });
        else scrollableRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  };

  const onSelectLocation = (location: string) => {
    setBusinessAddress({ ...businessAddress, value: location, error: "" });
    setIsSearchLocationOpen(false);
  };

  return (
    <StyledStage1Wrapper>
      <ScrollView ref={scrollableRef} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <StyledStage1Content>
          <Progressbar currentStage={1} stages={4} />
          <StyledStage1Title>כניסה למערכת</StyledStage1Title>
          <StyledStage1Subtitle>נראה שאין לכם עדיין פרופיל, בואו נתחיל</StyledStage1Subtitle>
          <Dropdown
            showTags
            label="קטגוריות"
            placeholder="הקטגוריות של העסק"
            icon={<IconCategory name="category" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
            error={isFormSubmitted ? categories.error : ""}
            onSelect={onSelectCategory}
            isOpen={isCategoryOpen}
            onToggle={onToggleCategoryDropdown}
            selectedCategories={categories.value}
            options={["מספרה", "ציפורניים", "מסעדה", "חנות נעליים", "ספריה", "מספרת כלבים", "סטודיו פילאטיס", "בית קפה", "מכולת אורגנית", "סדנת אמיתות"]}
          />

          <TextInput
            placeholder="מה השם ?"
            onFocus={() => onInputToggleEditMode("name")}
            onBlur={() => onInputToggleEditMode("name")}
            error={isFormSubmitted ? businessName.error : ""}
            onChange={(event) => onInputChange(event, "name")}
            label="שם העסק"
            icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="note-text-outline" />}
          />
          <SearchLocation
            onSelect={onSelectLocation}
            value={businessAddress.value}
            error={isFormSubmitted ? businessAddress.error : ""}
            icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="home-outline" />}
            isOpen={isSearchLocationOpen}
            label="כתובת העסק"
            onToggle={onToggleSearchLocation}
            placeholder="חפש כתובת כאן"
          />
          <TelInput
            placeholder="מה הטלפון ?"
            onFocus={() => onInputToggleEditMode("tel")}
            onBlur={() => onInputToggleEditMode("tel")}
            error={isFormSubmitted ? businessTel.error : ""}
            onChange={(event) => onInputChange(event, "tel")}
            label="טלפון"
            icon={<Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="phone-check-outline" />}
          />
          <StyledDaysAndLabelWrapper>
            <StyledLabelIconWrapper>
              <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />
              <StyledDaysLabel>ימים ושעות</StyledDaysLabel>
            </StyledLabelIconWrapper>
            <SelectDaysAndHours
              error={isFormSubmitted && (selectedDaysAndHours.isEditMode || selectedDaysAndHours.error) ? selectedDaysAndHours.error : ""}
              selectedDaysAndHours={selectedDaysAndHours.value}
              onEditMode={onEditDaysAndHours}
              onSubmitDaysAndHours={onSubmitDaysAndHours}
              days={selectedDays}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
          </StyledDaysAndLabelWrapper>
        </StyledStage1Content>
      </ScrollView>
      <NextStageButton disabled={false} onNextStage={onNextStage}>
        {!isEditMode ? "לשלב הבא" : "שמור"}
      </NextStageButton>
    </StyledStage1Wrapper>
  );
};
export default Stage1;
