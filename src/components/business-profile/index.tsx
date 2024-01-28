import { useAppSelector } from "../../../redux/store";
import { StyledWrapper } from "./styled";
import { type Props } from "./types";

const BusinessProfile = ({ isEditMode }: Props) => {
  const business = useAppSelector((state) => state.business);
  console.log("business ", business);
  return <StyledWrapper></StyledWrapper>;
};
export default BusinessProfile;
