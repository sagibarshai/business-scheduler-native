import BusinessProfile from "../../../components/business-profile";
import { StyledStage2Wrapper, StyledText } from "./styled";
import { Props } from "./types";

const Stage2 = () => {
  return (
    <StyledStage2Wrapper>
      <BusinessProfile address={"address"} category={"category"} name={"name"} selectedDaysAndHours={[]} />
    </StyledStage2Wrapper>
  );
};
export default Stage2;
