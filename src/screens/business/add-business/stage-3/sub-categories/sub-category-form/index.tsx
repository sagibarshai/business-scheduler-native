import Countdown from "../../../../../../components/time/count-down";

import { type Props } from "./types";

import {
  StyledButtonsWrapper,
  StyledRow,
  StyledSubCategoryFormWrapper,
  StyledTitle,
} from "./styled";
import { useState } from "react";
import { CountdownProps } from "../../../../../../components/time/count-down/types";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import SaveButton from "../../../../../../components/inputs/buttons/save-button";
import CancelButton from "../../../../../../components/inputs/buttons/cancel-button";
import NumericInput from "../../../../../../components/inputs/numeric";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../../../../../../../theme";
import TextInput from "../../../../../../components/inputs/text";
import { SubCategoryState } from "../../types";

const SubCategoriesForm = ({
  onSave,
  onCancel,
  subCategoryData,
  openTimeOnMount,
  isNameEditable,
  disallowServicesNames,
}: Props) => {
  const [selectedSubCategoryData, setSelectedSubCategoryData] = useState<SubCategoryState>({
    ...subCategoryData,
    price: {
      ...subCategoryData.price,
      isValid: Boolean(
        typeof subCategoryData.price.value === "number" && subCategoryData.price.value > 0
      ),
    },
    time: {
      ...subCategoryData.time,
      isValid: subCategoryData.time.value.hours > 0 || subCategoryData.time.value.minutes > 0,
    },
    name: {
      ...subCategoryData.name,
      isValid: isNameEditable ? false : true,
      showErrorMessage: true,
      error: "מינימום 2 אותיות",
    },
  });
  const onSubmitServiceTime = (countdownTime: CountdownProps) => {
    setSelectedSubCategoryData({
      ...selectedSubCategoryData,
      time: {
        ...selectedSubCategoryData.time,
        value: countdownTime,
        isValid: countdownTime.hours > 0 || countdownTime.minutes > 0,
        error: "זמן לא תקין",
        showErrorMessage: true,
      },
    });
  };

  const onPriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    // setPriceError(false);
    const priceValue = Number(event.nativeEvent.text);
    setSelectedSubCategoryData({
      ...selectedSubCategoryData,
      price: {
        ...selectedSubCategoryData,
        value: priceValue,
        isValid: Boolean(typeof priceValue === "number" && priceValue > 0),
        showErrorMessage: true,
        error: "מחיר לא תקין",
      },
    });
  };
  const onServiceNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const nameValue = event.nativeEvent.text;

    let isNameValid: boolean = false;
    let nameErrorMsg: string = "";

    const isServiceNameNotValid = disallowServicesNames.find((str) => str === nameValue);

    if (isNameEditable) {
      if (nameValue.length < 2) nameErrorMsg = "מינימום 2 אותיות";
      else if (isServiceNameNotValid) {
        nameErrorMsg = "שם השירות כבר קיים ברשימה";
      } else isNameValid = true;
    } else {
      if (nameValue.length < 2) nameErrorMsg = "מינימום 2 אותיות";
      else isNameValid = true;
    }

    setSelectedSubCategoryData({
      ...selectedSubCategoryData,
      name: {
        ...selectedSubCategoryData.name,
        value: nameValue,
        isValid: isNameValid,
        showErrorMessage: true,
        error: nameErrorMsg,
      },
    });
  };

  const checkFormValidity = (): boolean => {
    let isValid = false;
    if (
      !selectedSubCategoryData.price.isValid ||
      !selectedSubCategoryData.time.isValid ||
      !selectedSubCategoryData.name.isValid
    ) {
      setSelectedSubCategoryData({
        ...selectedSubCategoryData,
        isValid: false,
        price: { ...selectedSubCategoryData.price, showErrorMessage: true },
        time: { ...selectedSubCategoryData.time, showErrorMessage: true },
        name: { ...selectedSubCategoryData.name, showErrorMessage: true },
      });
      return isValid;
    } else {
      isValid = true;
      setSelectedSubCategoryData({
        ...selectedSubCategoryData,
        isValid: true,
      });
    }
    return isValid;
  };

  const onSaveSubCategoryForm = () => {
    const isValid = checkFormValidity();
    if (!isValid) return;
    onSave(selectedSubCategoryData);
  };

  return (
    <StyledSubCategoryFormWrapper>
      {!isNameEditable && <StyledTitle>{subCategoryData.name.value}</StyledTitle>}
      <StyledRow>
        {isNameEditable && (
          <TextInput
            label="שם השירות"
            onChange={onServiceNameChange}
            width="100%"
            error={
              selectedSubCategoryData.name.showErrorMessage && !selectedSubCategoryData.name.isValid
                ? selectedSubCategoryData.name.error
                : ""
            }
          />
        )}
      </StyledRow>
      <StyledRow>
        <Countdown
          error={
            selectedSubCategoryData.time.showErrorMessage && !selectedSubCategoryData.time.isValid
              ? selectedSubCategoryData.time.error
              : ""
          }
          openTimeOnMount={openTimeOnMount}
          width="40%"
          defaultHours={
            typeof selectedSubCategoryData.time.value?.hours === "number"
              ? selectedSubCategoryData.time.value?.hours
              : 0
          }
          defaultMinutes={
            typeof selectedSubCategoryData.time.value?.minutes === "number"
              ? selectedSubCategoryData.time.value?.minutes
              : 30
          }
          labelText="כמה זמן ?"
          modalTitle={`${subCategoryData.name.value}`}
          onSubmit={onSubmitServiceTime}
        />

        <NumericInput
          value={selectedSubCategoryData.price?.value?.toString()}
          withCurrency
          width="40%"
          label="מחיר"
          onChange={onPriceChange}
          error={
            selectedSubCategoryData.price.showErrorMessage && !selectedSubCategoryData.price.isValid
              ? selectedSubCategoryData.price.error
              : ""
          }
          icon={
            <Icon name="price-change" size={theme.icons.sizes.m} color={theme.icons.colors.aqua} />
          }
        />
      </StyledRow>
      <StyledButtonsWrapper>
        <CancelButton onPress={() => onCancel(selectedSubCategoryData)} text="ביטול" />
        <SaveButton text="שמור" onPress={onSaveSubCategoryForm} />
      </StyledButtonsWrapper>
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
