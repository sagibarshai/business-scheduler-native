import { useEffect, useState } from "react";

import SelectDays from "../../../../../components/select-days";
import SelectTime from "../../../../../components/time/select-time";

import { theme } from "../../../../../../theme";

import { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { type Errors, Props, SelectedHoursAndDays } from "./types";
import { type Role } from "../../../../../components/time/select-time/types";

import { StyledSelectTimeWrapper, StyledTimeWrapper, StyledWrapper, StyledTimeSaveButton, StyledTimeSaveButtonText, StyledErrorMessage } from "./styled";
import SelectedDaysAndHoursDisplay from "../../../../../components/selected-days-and-hour-display";

const now = new Date();
let dateWithTime9: Date = new Date(now.setHours(9, 0, 0));
let dateWithTime17: Date = new Date(now.setHours(17, 0, 0));

const SelectDaysAndHours = ({ selectedDays, setSelectedDays, days, selectedDaysAndHours, onSubmitDaysAndHours, error, onEditMode }: Props) => {
  const [startHour, setStartHour] = useState<Date>(dateWithTime9);
  const [endHour, setEndHour] = useState<Date>(dateWithTime17);
  const [parseStartHour, setParseStartHour] = useState<string>("09:00");
  const [parseEndHour, setParseEndHour] = useState<string>("17:00");
  const [errors, setErrors] = useState<Errors>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const onSaveWorkingHours = (event: DateTimePickerEvent, role: Role) => {
    const date = new Date(event.nativeEvent.timestamp);
    const time = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Jerusalem",
      hour12: false,
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
      const updatedErrors: Errors = [...errors]; // copy the previous errors
      updatedErrors.push({ filed: "days", message: "לא נבחרו ימים ושעות" });
      setErrors(updatedErrors);
      return;
    }

    let updatedSelectedDaysAndHours = [...selectedDaysAndHours.map((row) => ({ ...row, editMode: false }))]; // reset all edit mode if have

    // on add mode
    if (editIndex < 0) {
      updatedSelectedDaysAndHours.push({
        days: days.filter((day) => (day.selected ? day : false)),
        from: parseStartHour,
        to: parseEndHour,
        editMode: false,
        startHour,
        endHour,
      });
    }

    // on save after edit
    else {
      updatedSelectedDaysAndHours[editIndex].from = parseStartHour;
      updatedSelectedDaysAndHours[editIndex].to = parseEndHour;
      updatedSelectedDaysAndHours[editIndex].days = days.filter((day) => day.selected);
    }

    // set all the selected days to disabled true and selected false after save
    const updatedDays = [...selectedDays];
    for (let day of updatedDays) {
      if (day.selected) {
        day.disabled = true;
        day.selected = false;
      }
    }
    setSelectedDays(updatedDays);
    onSubmitDaysAndHours(updatedSelectedDaysAndHours);
    setEditIndex(-1);
  };

  useEffect(() => {
    checkIfFormIsValid();
  }, [days]);

  const onEditRow = (rowIndex: number) => {
    onEditMode();
    setStartHour(selectedDaysAndHours[rowIndex].startHour);
    setEndHour(selectedDaysAndHours[rowIndex].endHour);
    const existingRow = selectedDaysAndHours[rowIndex];
    existingRow.editMode = true;

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
    setEditIndex(rowIndex);
  };

  return (
    <StyledWrapper>
      <SelectDays days={days} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <StyledSelectTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime defaultParsedValue={parseStartHour} role="from" defaultValue={startHour as Date} onChange={onSaveWorkingHours} labelText="שעת פתיחה" />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <SelectTime defaultParsedValue={parseEndHour} onChange={onSaveWorkingHours} defaultValue={endHour as Date} role="to" labelText="עד מתי?" />
        </StyledTimeWrapper>
        <StyledTimeWrapper>
          <StyledTimeSaveButton disabled={!checkIfFormIsValid()} onPress={onSaveWorkingDaysAndHours}>
            <StyledTimeSaveButtonText>{editIndex >= 0 ? "שינוי" : "הוספה"}</StyledTimeSaveButtonText>
          </StyledTimeSaveButton>
        </StyledTimeWrapper>
      </StyledSelectTimeWrapper>
      {error ? <StyledErrorMessage>{error}</StyledErrorMessage> : <SelectedDaysAndHoursDisplay canEdit editIndex={editIndex} onEditRow={onEditRow} selectedDaysAndHours={selectedDaysAndHours} />}
    </StyledWrapper>
  );
};
export default SelectDaysAndHours;
