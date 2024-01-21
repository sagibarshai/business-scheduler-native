import { Text, TouchableOpacity } from "react-native";
import SelectTime from "../../../../../components/select-time";
import { StyledSubCategoryFormWrapper } from "./styled";
import { Props } from "./types";

const SubCategoriesForm = ({ onSave }: Props) => {
  return (
    <StyledSubCategoryFormWrapper>
      <SelectTime defaultParsedValue="30" defaultValue={new Date()} labelText="בחר זמן" onChange={() => {}} role="from" />
      <SelectTime defaultParsedValue="30" defaultValue={new Date()} labelText="בחר זמן" onChange={() => {}} role="from" />
      <TouchableOpacity onPress={onSave}>
        <Text>שמור</Text>
      </TouchableOpacity>
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
