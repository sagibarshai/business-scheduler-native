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

const SubCategoriesForm = ({ onSave, onCancel }: Props) => {
  const [selectedSubCategoryData, setSelectedSubCategoryData] = useState<SubCatogory>({ name: "", price: null, time: null });

  const onSubmitServiceTime = (countdownTime: CountdownProps) => {
    setSelectedSubCategoryData({ ...selectedSubCategoryData, time: countdownTime });
  };
  const onPriceChange = (text: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSelectedSubCategoryData({ ...selectedSubCategoryData, price: Number(text) });
  };

  return (
    <StyledSubCategoryFormWrapper>
      <Countdown defaultHours={0} defaultMinutes={30} labelText="כמה זמן ?" modalTitle="בחר זמן עבור השירות" onSubmit={onSubmitServiceTime} />
      <TextInput label="מחיר" onChange={onPriceChange} error={""} />
      <SaveButton text="שמור" onPress={onSave} />
      <CancelButton onPress={onCancel} text="ביטול" />
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
