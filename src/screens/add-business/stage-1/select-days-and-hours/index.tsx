import SelectDays, { Days } from "../../../../components/select-days";
import SelectTime, { Role } from "../../../../components/select-time";

import { StyledSelectTimeWrapper, StyledTimeWrapper, StyledWrapper, StyledTimeSaveButton, StyledTimeSaveButtonText, StyledDaysAndHoursDisplayWrapper, StyledRow, StyledText, StyledRowAndIconWrapper } from "./styled";
import { useEffect, useState } from "react";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { theme } from "../../../../../theme";

type Errors = {
  message: string;
  filed: string;
}[];

type SelectedHoursAndDays = {
  days: Days;
  from: string;
  to: string;
  editMode: boolean;
}[];

interface Props {
  selectedDays: Days;
  setSelectedDays: React.Dispatch<React.SetStateAction<Days>>;
  days: Days;
}
const now = new Date();
let dateWithTime10: Date = new Date(now.setHours(10, 0, 0));
let dateWithTime18: Date = new Date(now.setHours(18, 0, 0));

const SelectDaysAndHours = ({ selectedDays, setSelectedDays, days }: Props) => {
  const [startHour, setStartHour] = useState<Date>(dateWithTime10);
  const [endHour, setEndHour] = useState<Date>(dateWithTime18);
  const [parseStartHour, setParseStartHour] = useState<string>("10:00");
  const [parseEndHour, setParseEndHour] = useState<string>("18:00");
  const [selectedDaysAndHours, setSelectedDaysAndHours] = useState<SelectedHoursAndDays>([]);
  const [errors, setErrors] = useState<Errors>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const onSaveWorkingHours = (event: DateTimePickerEvent, role: Role) => {
    const date = new Date(event.nativeEvent.timestamp);
    const time = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Jerusalem",
    });

    const splitTime = time.split(":");
    const fTime = splitTime[0] + ":" + splitTime[1];
    if (role === "from") {
      setParseStartHour(fTime);
      setStartHour(date);
    } else {
      setParseEndHour(fTime);
      setEndHour(date);
    }
  };

  const checkIfFormIsValid = () => {
    const pickedDays = days.filter((day) => day.selected && !day.disabled);
    if (!pickedDays.length) return false;
    return true;
  };

  const onSaveWorkingDaysAndHours = () => {
    const isFormValid = checkIfFormIsValid();
    if (!isFormValid) {
      const updatedErrors: Errors = [...errors];
      updatedErrors.push({ filed: "days", message: "No days was selected" });
      setErrors(updatedErrors);
      return;
    }
    let updatedRows = [...selectedDaysAndHours.map((row) => ({ ...row, editMode: false }))];
    if (editIndex < 0) {
      updatedRows.push({
        days: days.filter((day) => (day.selected ? day : false)),
        from: parseStartHour,
        to: parseEndHour,
        editMode: false,
      });
    } else {
      updatedRows[editIndex].from = parseStartHour;
      updatedRows[editIndex].to = parseEndHour;
      updatedRows[editIndex].days = days.filter((day) => day.selected);
    }

    const updatedDays = [...selectedDays];
    for (let day of selectedDays) {
      if (day.selected) {
        day.disabled = true;
        day.selected = false;
      }
    }
    setSelectedDays(updatedDays);
    setSelectedDaysAndHours(updatedRows);
    setEditIndex(-1);
  };

  useEffect(() => {
    checkIfFormIsValid();
  }, [days]);

  const onEditRow = (rowIndex: number) => {
    const existingRow = selectedDaysAndHours[rowIndex];
    existingRow.editMode = true;
    let updatedDaysAndHours = [...selectedDaysAndHours];
    const updatedSelectedDays = [...selectedDays];
    for (let i = 0; i < updatedSelectedDays.length; i++) {
      for (let j = 0; j < existingRow.days.length; j++) {
        if (existingRow.days[j].name === updatedSelectedDays[i].name) {
          updatedSelectedDays[i].disabled = false;
          updatedSelectedDays[i].selected = true;
        }
      }
    }
    setSelectedDays(updatedSelectedDays);
    setParseEndHour(existingRow.to);
    setParseStartHour(existingRow.from);
    setSelectedDaysAndHours(updatedDaysAndHours);
    setEditIndex(rowIndex);
  };
  console.log("editIndex ", editIndex);
  return (
    <StyledWrapper>
      <SelectDays days={days} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <StyledSelectTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime role="from" defaultValue={startHour as Date} onChange={onSaveWorkingHours} labelText="שעת פתיחה" />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime onChange={onSaveWorkingHours} defaultValue={endHour as Date} role="to" labelText="עד מתי?" />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <StyledTimeSaveButton disabled={!checkIfFormIsValid()} onPress={onSaveWorkingDaysAndHours}>
            <StyledTimeSaveButtonText>{editIndex < 0 ? "שינוי" : "הוספה"}</StyledTimeSaveButtonText>
          </StyledTimeSaveButton>
        </StyledTimeWrapper>
      </StyledSelectTimeWrapper>
      <StyledDaysAndHoursDisplayWrapper>
        {selectedDaysAndHours.map((row, rowIndex) => (
          <StyledRowAndIconWrapper editMode={row.editMode} key={rowIndex}>
            <Icon onPress={() => onEditRow(rowIndex)} color={editIndex < 0 ? theme.icons.colors.aquaDisabled : theme.icons.colors.aqua} size={theme.icons.sizes.m} name="edit" />
            <StyledRow>
              <StyledText>{row.days.length === 1 ? "יום" : "ימים"} </StyledText>
              {row.days.map((day, dayIndex) => (
                <StyledText key={day.name}>
                  {" "}
                  {day.name}
                  {dayIndex === row.days.length - 1 ? ": " : ", "}
                </StyledText>
              ))}
              <StyledText>
                {" "}
                {" - "}
                {row.from}{" "}
              </StyledText>
              <StyledText>{row.to}</StyledText>
            </StyledRow>
          </StyledRowAndIconWrapper>
        ))}
      </StyledDaysAndHoursDisplayWrapper>
    </StyledWrapper>
  );
};
export default SelectDaysAndHours;
