import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCategory from "react-native-vector-icons/MaterialIcons";

import TextInput from "../../../../components/inputs/text";
import Dropdown from "../../../../components/inputs/dropdown";
import Progressbar from "../../../../components/progress-bar";
import SelectDaysAndHours from "./select-days-and-hours";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";

import { theme } from "../../../../../theme";
import { days } from "../../../../components/select-days";
import {
  TelErrorMessage,
  addressErrorMessage,
  categoryErrorMessage,
  daysAndHoursErrorMessage,
  nameErrorMessage,
} from "./errors/messages";

import {
  StyledDaysLabel,
  StyledDaysAndLabelWrapper,
  StyledLabelIconWrapper,
  StyledStage1Subtitle,
  StyledStage1Title,
  StyledStage1Wrapper,
  StyledStage1Content,
} from "./styled";

import { type TextInputChangeEventData } from "react-native";
import { type SelectedHoursAndDays } from "./select-days-and-hours/types";
import { type NativeSyntheticEvent } from "react-native";
import { type InputState } from "../../../../components/inputs/types";
import { type Days } from "../../../../components/select-days/types";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { setBusinessMetaData } from "../../../../../redux/featuers/business/businessSlice";
import SearchLocation from "../../../../components/search-location";
import TelInput from "../../../../components/inputs/tel";
import { isPhone } from "../../../../utils/valitators";
import { AxiosError } from "axios";
import { appAxios } from "../../../../../axios";
import { useAppNavigation } from "../../../../hooks/use-app-navigation";
import { useAppRouteParams } from "../../../../hooks/use-app-route-params";
import { Category } from "./types";
import { SubCatogory } from "../stage-3/sub-categories/types";
import { RootStackParamList } from "../../../../../types";

const Stage1 = () => {
  const user = useAppSelector((state) => state.user);
  const businessMetaData = useAppSelector((state) => state.business.metaData);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedDays, setSelectedDays] = useState<Days>(days);

  const [selectedCategory, setSelectedCategory] = useState<InputState<string>>({
    value: businessMetaData.category,
    error: categoryErrorMessage,
    isEditMode: false,
    isValid: false,
    showErrorMessage: false,
  });

  const [businessPhone, setBusinessPhone] = useState<InputState<string>>({
    showErrorMessage: false,
    isValid: false,
    value: businessMetaData.phone,
    error: TelErrorMessage,
    isEditMode: false,
  });

  const [businessName, setBusinessName] = useState<InputState<string>>({
    showErrorMessage: false,
    isValid: false,
    value: businessMetaData.name,
    error: nameErrorMessage,
    isEditMode: false,
  });

  const [businessAddress, setBusinessAddress] = useState<InputState<string>>({
    showErrorMessage: false,
    isValid: false,
    value: businessMetaData.address,
    error: addressErrorMessage,
    isEditMode: false,
  });

  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<
    InputState<SelectedHoursAndDays>
  >({
    error: daysAndHoursErrorMessage,
    isEditMode: false,
    value: businessMetaData.workingDaysAndHours,
    isValid: false,
    showErrorMessage: false,
  });

  const getCategories = async () => {
    try {
      const categoriesResponse: { data: { categories: Category[] } } = await appAxios.get(
        "/business/categories-options",
        {
          headers: {
            Authorization: `Berar ${user.token}`,
          },
        }
      );
      setCategories(categoriesResponse.data.categories);
    } catch (err) {
      const error = err as AxiosError;
      console.log("err ", error.response?.data);
      if (error.response?.status === 401) navigation.navigateTo("auth");
    }
  };

  useEffect(() => {
    if (user.token) {
      getCategories();
    }
  }, [user.token]);

  const scrollableRef = useRef<ScrollView>(null);

  const stage1Params = useAppRouteParams({ screen: "stage-1" }) as RootStackParamList["stage-1"];

  const onSelectCategory = (selected: string) =>
    setSelectedCategory({
      ...selectedCategory,
      value: selected,
      isValid: Boolean(selected),
      isEditMode: false,
    });

  // days and hours
  const onEditDaysAndHours = () =>
    setSelectedDaysAndHours({
      ...selectedDaysAndHours,
      isEditMode: true,
    });

  const onSubmitDaysAndHours = (data: SelectedHoursAndDays) => {
    setSelectedDaysAndHours({
      ...selectedDaysAndHours,
      value: data,
      isEditMode: false,
      isValid: data.length > 0,
    });
    if (scrollableRef.current) {
      scrollableRef.current.scrollToEnd();
    }
  };
  // inputs

  const onInputChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    filed: "name" | "tel"
  ) => {
    const value = event.nativeEvent.text;
    if (filed === "name")
      setBusinessName({
        ...businessName,
        value,
        isValid: value.length >= 2,
        showErrorMessage: true,
      });
    else if (filed === "tel")
      setBusinessPhone({
        ...businessPhone,
        value,
        isValid: isPhone(value),
        showErrorMessage: true,
      });
  };

  const onInputToggleEditMode = (filed: "address" | "categories") => {
    if (filed === "address") {
      setBusinessAddress({
        ...businessAddress,
        isEditMode: !businessAddress.isEditMode,
        showErrorMessage: businessAddress.isEditMode,
        isValid: businessAddress.value.length > 0,
      });
    } else if (filed === "categories") {
      setSelectedCategory({
        ...selectedCategory,
        isEditMode: !selectedCategory.isEditMode,
        showErrorMessage: selectedCategory.isEditMode,
        isValid: selectedCategory.value.length > 0,
      });
    }
  };

  const onNextStage = async () => {
    const dispatchPromise = new Promise<void>((resolve) => {
      dispatch(
        setBusinessMetaData({
          address: businessAddress.value,
          name: businessName.value,
          workingDaysAndHours: selectedDaysAndHours.value,
          category: selectedCategory.value,
          phone: businessPhone.value,
        })
      );
      resolve();
    });

    // Wait for the dispatchPromise to resolve before navigating to "stage-2"
    await dispatchPromise;

    stage1Params?.isEditMode
      ? navigation.navigateTo("business-profile")
      : navigation.navigateTo("stage-2");
  };

  const onSelectLocation = (location: string) => {
    setBusinessAddress({
      ...businessAddress,
      value: location,
      error: "",
      isEditMode: !businessAddress.isEditMode,
      isValid: Boolean(location),
    });
  };

  return (
    <StyledStage1Wrapper>
      <ScrollView
        ref={scrollableRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 80,
        }}
      >
        <StyledStage1Content>
          <Progressbar currentStage={1} stages={4} />
          <StyledStage1Title>כניסה למערכת</StyledStage1Title>
          <StyledStage1Subtitle>נראה שאין לכם עדיין פרופיל, בואו נתחיל</StyledStage1Subtitle>
          <Dropdown
            showTags
            label="קטגוריות"
            placeholder="הקטגוריות של העסק"
            icon={
              <IconCategory
                name="category"
                color={theme.icons.colors.aqua}
                size={theme.icons.sizes.m}
              />
            }
            error={
              selectedCategory.showErrorMessage && !selectedCategory.isValid
                ? selectedCategory.error
                : ""
            }
            onSelect={onSelectCategory}
            isOpen={selectedCategory.isEditMode}
            onToggle={() => onInputToggleEditMode("categories")}
            selectedCategories={selectedCategory.value ? [selectedCategory.value] : []}
            options={categories.map((category) => category.name)}
          />

          <TextInput
            placeholder="מה השם ?"
            error={businessName.showErrorMessage && !businessName.isValid ? businessName.error : ""}
            onChange={(event) => onInputChange(event, "name")}
            label="שם העסק"
            icon={
              <Icon
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="note-text-outline"
              />
            }
          />
          <SearchLocation
            onSelect={onSelectLocation}
            value={businessAddress.value}
            error={
              businessAddress.showErrorMessage && !businessAddress.isValid
                ? businessAddress.error
                : ""
            }
            icon={
              <Icon
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="home-outline"
              />
            }
            isOpen={businessAddress.isEditMode}
            label="כתובת העסק"
            onToggle={() => onInputToggleEditMode("address")}
            placeholder="חפש כתובת כאן"
          />
          <TelInput
            placeholder="מה הטלפון ?"
            error={
              businessPhone.showErrorMessage && !businessPhone.isValid ? businessPhone.error : ""
            }
            onChange={(event) => onInputChange(event, "tel")}
            label="טלפון"
            icon={
              <Icon
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="phone-check-outline"
              />
            }
          />
          <StyledDaysAndLabelWrapper>
            <StyledLabelIconWrapper>
              <Icon
                size={theme.icons.sizes.m}
                color={theme.icons.colors.aqua}
                name="clock-edit-outline"
              />
              <StyledDaysLabel>ימים ושעות</StyledDaysLabel>
            </StyledLabelIconWrapper>
            <SelectDaysAndHours
              error={
                selectedCategory.isValid &&
                businessName.isValid &&
                businessAddress.isValid &&
                businessPhone.isValid &&
                !selectedDaysAndHours.isValid
                  ? selectedDaysAndHours.error
                  : ""
              }
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
      <NextStageButton
        disabled={
          !selectedCategory.isValid ||
          !businessName.isValid ||
          !businessAddress.isValid ||
          !businessPhone.isValid ||
          !selectedDaysAndHours.isValid
        }
        onNextStage={onNextStage}
      >
        {!stage1Params?.isEditMode ? "לשלב הבא" : "שמור"}
      </NextStageButton>
    </StyledStage1Wrapper>
  );
};
export default Stage1;
