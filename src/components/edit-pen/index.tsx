import Icon from "react-native-vector-icons/MaterialIcons";
import { StyledEditPenWrapper, StyledText, StyledWrapper } from "./styled";
import { theme } from "../../../theme";
import { Props } from "./types";

const EditPen = ({ onPress }: Props) => {
  return (
    <StyledWrapper onPress={onPress}>
      <StyledEditPenWrapper>
        <Icon name="edit" color={theme.icons.colors.white} size={theme.icons.sizes.m} />
      </StyledEditPenWrapper>
      <StyledText>עריכה</StyledText>
    </StyledWrapper>
  );
};
export default EditPen;
