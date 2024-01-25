import { setHours, setMinutes } from "date-fns";

import Countdown from "../../../../../components/time/count-down";

import { type Props } from "./types";

import { StyledSubCategoryFormWrapper } from "./styled";

const SubCategoriesForm = ({ onSave }: Props) => {
  let defaultDate = new Date();
  defaultDate = setHours(defaultDate, 0);
  defaultDate = setMinutes(defaultDate, 45);
  return (
    <StyledSubCategoryFormWrapper>
      <Countdown defaultParsedValue="" defaultValue={defaultDate} labelText="משך התור" onChange={() => {}} />
    </StyledSubCategoryFormWrapper>
  );
};
export default SubCategoriesForm;
