import { Props } from "./types";
import { StyledContent, StyledModal } from "./styled";
import { BlurView } from "@react-native-community/blur";

const CustomModal = ({ children, isOpen, onClose }: Props) => {
  return (
    <StyledModal visible={isOpen} animationType="fade" transparent>
      <BlurView onTouchEnd={onClose} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} blurType="dark" blurAmount={1.5}>
        <StyledContent height="100%">{children}</StyledContent>
      </BlurView>
    </StyledModal>
  );
};
export default CustomModal;
