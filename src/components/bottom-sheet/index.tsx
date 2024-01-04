import { StyledBottomSheetContent, StyledBottomSheetWrapper, StyledXButtonText, StyledButtonWrapper, StyledChildrenWrapper } from "./styled";

import { Props } from "./types";
import { BlurView } from "@react-native-community/blur";

const CustomBottomSheet = ({ children, onClose, height }: Props) => {
  return (
    <StyledBottomSheetWrapper animationType="slide" visible={true} transparent>
      <BlurView onTouchEnd={onClose} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} blurType="light" blurAmount={1.5}>
        <StyledBottomSheetContent height={height} onTouchEnd={(e) => e.stopPropagation()}>
          <StyledButtonWrapper onTouchEnd={onClose}>
            <StyledXButtonText>X</StyledXButtonText>
          </StyledButtonWrapper>
          <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
        </StyledBottomSheetContent>
      </BlurView>
    </StyledBottomSheetWrapper>
  );
};
export default CustomBottomSheet;
