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

const SubCategoriesForm = ({ onSave, onCancel, subCategoryData }: Props) => {
  const [selectedSubCategoryData, setSelectedSubCategoryData] = useState<SubCatogory>(subCategoryData);

  const onSubmitServiceTime = (countdownTime: CountdownProps) => {
    setSelectedSubCategoryData({ ...selectedSubCategoryData, time: countdownTime });
  };
  const onPriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSelectedSubCategoryData({ ...selectedSubCategoryData, price: Number(event.nativeEvent.text) });
  };

  const onSaveSubCategoryForm = () => {
    onSave(selectedSubCategoryData);
  };

  return (
    <StyledSubCategoryFormWrapper>
      <StyledTitle>{subCategoryData.name}</StyledTitle>
      <Countdown defaultHours={selectedSubCategoryData.time?.hours || 0} defaultMinutes={selectedSubCategoryData.time?.minutes || 30} labelText="כמה זמן ?" modalTitle={`${subCategoryData.name}`} onSubmit={onSubmitServiceTime} />
      <NumericInput width="30%" label="מחיר" onChange={onPriceChange} error={""} icon={<Icon name="price-change" size={theme.icons.sizes.m} color={theme.icons.colors.aqua} />} />
      <StyledButtonsWrapper>
        <SaveButton text="שמור" onPress={onSaveSubCategoryForm} />
        <CancelButton onPress={onCancel} text="ביטול" />
      </StyledButtonsWrapper>
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
