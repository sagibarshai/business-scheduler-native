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

const SubCategoriesForm = ({ onSave, onCancel, subCategoryData, openTimeOnMount }: Props) => {
  const [selectedSubCategoryData, setSelectedSubCategoryData] =
    useState<SubCatogory>(subCategoryData);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [serviceName, setServiceName] = useState<string>(
    selectedSubCategoryData.name === "אחר" ? "" : selectedSubCategoryData.name
  );

  const onSubmitServiceTime = (countdownTime: CountdownProps) => {
    setSelectedSubCategoryData({ ...selectedSubCategoryData, defaultTime: countdownTime });
  };
  const onPriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPriceError(false);
    setSelectedSubCategoryData({
      ...selectedSubCategoryData,
      price: Number(event.nativeEvent.text),
    });
  };
  const onServiceNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setServiceName(event.nativeEvent.text);
    setSelectedSubCategoryData({ ...selectedSubCategoryData, name: event.nativeEvent.text });

    setNameError(false);
  };

  const checkFormValidity = (): boolean => {
    let isValid = false;
    if (!selectedSubCategoryData.price) {
      setPriceError(true);
    }
    if (serviceName.length <= 2) {
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
      {!false && <StyledTitle>{subCategoryData.name}</StyledTitle>}
      <StyledRow>
        {false && (
          <TextInput
            label="שם השירות"
            onChange={onServiceNameChange}
            width="30%"
            error={nameError ? subCategoryNameIsEmpty : ""}
          />
        )}
      </StyledRow>
      <StyledRow>
        <Countdown
          openTimeOnMount={openTimeOnMount}
          width="40%"
          defaultHours={
            typeof selectedSubCategoryData.defaultTime?.hours === "number"
              ? selectedSubCategoryData.defaultTime?.hours
              : 0
          }
          defaultMinutes={
            typeof selectedSubCategoryData.defaultTime?.minutes === "number"
              ? selectedSubCategoryData.defaultTime?.minutes
              : 30
          }
          labelText="כמה זמן ?"
          modalTitle={`${subCategoryData.name}`}
          onSubmit={onSubmitServiceTime}
        />

        <NumericInput
          value={selectedSubCategoryData.price?.toString()}
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
        <CancelButton onPress={onCancel} text="ביטול" />
        <SaveButton text="שמור" onPress={onSaveSubCategoryForm} />
      </StyledButtonsWrapper>
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
