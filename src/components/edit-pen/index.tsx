import Icon from "react-native-vector-icons/MaterialIcons";
import { StyledEditPenWrapper } from "./styled";
import { theme } from "../../../theme";
import { Props } from "./types";

const EditPen = ({ onPress }: Props) => {
  return (
    <StyledEditPenWrapper onPress={onPress}>
      <Icon name="edit" color={theme.icons.colors.white} size={theme.icons.sizes.m} />
    </StyledEditPenWrapper>
  );
};
export default EditPen;
