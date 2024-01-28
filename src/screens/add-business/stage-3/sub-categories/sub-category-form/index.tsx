import Countdown from "../../../../../components/time/count-down";

import { type Props } from "./types";

import { StyledButtonsWrapper, StyledRow, StyledSubCategoryFormWrapper, StyledTitle } from "./styled";
import { useState } from "react";
import { SubCatogory } from "../types";
import { CountdownProps } from "../../../../../components/time/count-down/types";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import SaveButton from "../../../../../components/inputs/buttons/save-button";
import CancelButton from "../../../../../components/inputs/buttons/cancel-button";
import NumericInput from "../../../../../components/inputs/numeric";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../../../../../../theme";
import { subCategoryPriceErrorMessage } from "../../errors/messages";

const SubCategoriesForm = ({ onSave, onCancel, subCategoryData }: Props) => {
  const [selectedSubCategoryData, setSelectedSubCategoryData] = useState<SubCatogory>(subCategoryData);
  const [priceError, setPriceError] = useState<boolean>(false);

  const onSubmitServiceTime = (countdownTime: CountdownProps) => {
    setSelectedSubCategoryData({ ...selectedSubCategoryData, time: countdownTime });
  };
  const onPriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPriceError(false);
    setSelectedSubCategoryData({ ...selectedSubCategoryData, price: Number(event.nativeEvent.text) });
  };

  const checkFormValidity = (): boolean => {
    let isValid = false;
    if (!selectedSubCategoryData.price) {
      setPriceError(true);
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
      <StyledTitle>{subCategoryData.name}</StyledTitle>
      <StyledRow>
        <Countdown width="30%" defaultHours={selectedSubCategoryData.time?.hours || 0} defaultMinutes={selectedSubCategoryData.time?.minutes || 30} labelText="כמה זמן ?" modalTitle={`${subCategoryData.name}`} onSubmit={onSubmitServiceTime} />
        <NumericInput width="30%" label="מחיר" onChange={onPriceChange} error={priceError ? subCategoryPriceErrorMessage : ""} icon={<Icon name="price-change" size={theme.icons.sizes.m} color={theme.icons.colors.aqua} />} />
      </StyledRow>
      <StyledButtonsWrapper>
        <CancelButton onPress={onCancel} text="ביטול" />
        <SaveButton text="שמור" onPress={onSaveSubCategoryForm} />
      </StyledButtonsWrapper>
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
