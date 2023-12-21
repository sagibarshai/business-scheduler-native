import TimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { StyledLabel, StyledSelectTimeWrapper } from "./styled";
import { theme } from "../../../theme";

export type Role = "from" | "to";

interface Props {
  labelText: string;
  defaultValue: Date;
  onChange?: (event: DateTimePickerEvent, role: Role) => void;
  role: Role;
}
const SelectTime = ({ labelText, defaultValue, role, onChange = () => {} }: Props) => {
  return (
    <StyledSelectTimeWrapper>
      <StyledLabel>{labelText}</StyledLabel>
      <TimePicker id={labelText} textColor={theme.palette.colors.lights.texts.aqua} accentColor={theme.palette.colors.lights.texts.aqua} onChange={(event) => onChange(event, role)} minuteInterval={15} mode="time" value={defaultValue} />
    </StyledSelectTimeWrapper>
  );
};
export default SelectTime;
