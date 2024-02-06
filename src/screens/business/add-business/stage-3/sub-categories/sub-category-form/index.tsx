import Countdown from "../../../../../../components/time/count-down";

import { type Props } from "./types";

import {
  StyledButtonsWrapper,
  StyledRow,
  StyledSubCategoryFormWrapper,
  StyledTitle,
} from "./styled";
import { useState } from "react";
import { SubCatogory } from "../types";
import { CountdownProps } from "../../../../../../components/time/count-down/types";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import SaveButton from "../../../../../../components/inputs/buttons/save-button";
import CancelButton from "../../../../../../components/inputs/buttons/cancel-button";
import NumericInput from "../../../../../../components/inputs/numeric";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../../../../../../../theme";
import { subCategoryNameIsEmpty, subCategoryPriceErrorMessage } from "../../errors/messages";
import TextInput from "../../../../../../components/inputs/text";
import { SubCategoryState } from "../../types";

const SubCategoriesForm = ({
  onSave,
  onCancel,
  subCategoryData,
  openTimeOnMount,
  isNameEditable,
}: Props) => {
  const [selectedSubCategoryData, setSelectedSubCategoryData] =
    useState<SubCategoryState>(subCategoryData);

  const [timeError, setTimeError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [serviceName, setServiceName] = useState<string>(
    selectedSubCategoryData.name.value === "אחר" ? "" : selectedSubCategoryData.name.value
  );

  const onSubmitServiceTime = (countdownTime: CountdownProps) => {
    setTimeError(false);
    setSelectedSubCategoryData({
      ...selectedSubCategoryData,
      time: { ...selectedSubCategoryData.time, value: countdownTime },
    });
  };
  const onPriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPriceError(false);
    setSelectedSubCategoryData({
      ...selectedSubCategoryData,
      price: { ...selectedSubCategoryData, value: Number(event.nativeEvent.text) },
    });
  };
  const onServiceNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setServiceName(event.nativeEvent.text);
    setSelectedSubCategoryData({
      ...selectedSubCategoryData,
      name: { ...selectedSubCategoryData.name, value: event.nativeEvent.text },
    });

    setNameError(false);
  };

  const checkFormValidity = (): boolean => {
    let isValid = false;
    if (
      selectedSubCategoryData.time.value.hours === 0 &&
      selectedSubCategoryData.time.value.minutes === 0
    ) {
      setTimeError(true);
      return isValid;
    }
    if (
      !selectedSubCategoryData.price.value ||
      typeof Number(selectedSubCategoryData.price.value) !== "number"
    ) {
      setPriceError(true);
      return isValid;
    }
    if (serviceName.length <= 1) {
      setNameError(true);
      return isValid;
    }
    isValid = true;
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
            error={nameError ? subCategoryNameIsEmpty : ""}
          />
        )}
      </StyledRow>
      <StyledRow>
        <Countdown
          error={timeError ? "הזמן אינו תקין" : ""}
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
          error={priceError ? subCategoryPriceErrorMessage : ""}
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
