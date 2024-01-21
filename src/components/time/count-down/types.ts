import { DateTimePickerEvent } from "@react-native-community/datetimepicker";


export interface Props {
  labelText: string;
  defaultValue: Date;
  onChange: (event: DateTimePickerEvent) => void;
}