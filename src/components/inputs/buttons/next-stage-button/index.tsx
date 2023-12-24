import { theme } from "../../../../../theme";
import { StyledIconWrapper, StyledNextStageButton, StyledNextStageButtonText, StyledRow } from "./styled";
import { Props } from "./types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const NextStageButton = ({ disabled, onNextStage, children }: Props) => {
  return (
    <StyledNextStageButton disabled={disabled} onPress={onNextStage}>
      <StyledRow>
        <StyledNextStageButtonText>{children}</StyledNextStageButtonText>
        <StyledIconWrapper>
          <Icon name="chevron-left" size={theme.icons.sizes.m} color={theme.icons.colors.white} />
        </StyledIconWrapper>
      </StyledRow>
    </StyledNextStageButton>
  );
};
export default NextStageButton;
