import Icon from "react-native-vector-icons/MaterialIcons";
import { StyledEditPenWrapper } from "./styled";
import { theme } from "../../../theme";

const EditPen = () => {
  return (
    <StyledEditPenWrapper>
      <Icon name="edit" color={theme.icons.colors.white} size={theme.icons.sizes.m} />
    </StyledEditPenWrapper>
  );
};
export default EditPen;
