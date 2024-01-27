import { setHours, setMinutes } from "date-fns";

import Countdown from "../../../../../components/time/count-down";

import { type Props } from "./types";

import { StyledSubCategoryFormWrapper } from "./styled";
import { useState } from "react";
import { SubCatogory } from "../types";
import { CountdownProps } from "../../../../../components/time/count-down/types";
import TextInput from "../../../../../components/inputs/text";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import SaveButton from "../../../../../components/inputs/buttons/save-button";
import CancelButton from "../../../../../components/inputs/buttons/cancel-button";
import NumericInput from "../../../../../components/inputs/numeric";

const SubCategoriesForm = ({ onSave, onCancel, subCategoryData }: Props) => {
  const [selectedSubCategoryData, setSelectedSubCategoryData] = useState<SubCatogory>(subCategoryData);

  const onSubmitServiceTime = (countdownTime: CountdownProps) => {
    setSelectedSubCategoryData({ ...selectedSubCategoryData, time: countdownTime });
  };
  const onPriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log(event.nativeEvent.text);
    setSelectedSubCategoryData({ ...selectedSubCategoryData, price: Number(event.nativeEvent.text) });
  };

  const onSaveSubCategoryForm = () => {
    onSave(selectedSubCategoryData);
  };

  return (
    <StyledSubCategoryFormWrapper>
      <Countdown defaultHours={0} defaultMinutes={30} labelText="כמה זמן ?" modalTitle={`${subCategoryData.name}`} onSubmit={onSubmitServiceTime} />
      <NumericInput width="30%" label="מחיר" onChange={onPriceChange} error={""} />
      <SaveButton text="שמור" onPress={onSaveSubCategoryForm} />
      <CancelButton onPress={onCancel} text="ביטול" />
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
