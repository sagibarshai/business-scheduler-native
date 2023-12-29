import { useAppSelector } from "../../../../redux/store";
import BusinessProfile from "../../../components/business-profile";
import { StyledStage2Wrapper } from "./styled";
import { Props } from "./types";

const Stage2 = () => {
  const businessMetaData = useAppSelector((state) => state.business);
  console.log("businessMetaData ", businessMetaData);
  return (
    <StyledStage2Wrapper>
      <BusinessProfile />
    </StyledStage2Wrapper>
  );
};
export default Stage2;
