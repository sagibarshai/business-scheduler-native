import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../../../theme";

import { StyledDaysAndHoursDisplayWrapper, StyledRow, StyledRowAndIconWrapper, StyledText } from "./styled";
import { type Props } from "./types";

const SelectedDaysAndHoursDisplay = ({ selectedDaysAndHours, editIndex, onEditRow, canEdit = false }: Props) => {
  return (
    <StyledDaysAndHoursDisplayWrapper canEdit={canEdit}>
      {selectedDaysAndHours.map((row, rowIndex) => (
        <StyledRowAndIconWrapper editMode={row.editMode} key={rowIndex}>
          {canEdit && (
            <Icon
              onPress={() => {
                if (editIndex && editIndex < 0 && onEditRow) onEditRow(rowIndex);
              }}
              color={theme.icons.colors.aqua}
              size={theme.icons.sizes.m}
              name="pencil-outline"
            />
          )}
          <StyledRow>
            <StyledText>{row.days.length === 1 ? "יום" : "ימים"} </StyledText>
            {row.days.map((day, dayIndex) => (
              <StyledText key={day.name}>
                {" "}
                {day.name}
                {dayIndex === row.days.length - 1 ? " : " : ", "}
              </StyledText>
            ))}
            <StyledText>
              {" - "}
              {row.from}{" "}
            </StyledText>
            <StyledText>{row.to}</StyledText>
          </StyledRow>
        </StyledRowAndIconWrapper>
      ))}
    </StyledDaysAndHoursDisplayWrapper>
  );
};

export default SelectedDaysAndHoursDisplay;
