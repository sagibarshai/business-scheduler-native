import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export type Role = "from" | "to";

export interface Props {
  labelText: string;
  defaultValue: Date;
  onChange: (event: DateTimePickerEvent, role: Role) => void;
  role: Role;
  defaultParsedValue: string;
}