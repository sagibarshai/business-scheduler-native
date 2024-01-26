import { StyledLabel, StyledSelectTimeWrapper, StyledTimeButton, StyledText, StyledSaveButton } from "./styled";
import { useState } from "react";
import { CountdownProps, type Props } from "./types";
import { TimerPickerModal } from "react-native-timer-picker";
import CountdownTimeDisplay from "../countdown-time-display";

const Countdown = ({ onSubmit, defaultHours, defaultMinutes, labelText, modalTitle }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onChangeIsOpen = () => setIsOpen((prevState) => !prevState);
  const onConfirm = (data: CountdownProps) => {
    onSubmit(data);
    onChangeIsOpen();
  };

  return (
    <StyledSelectTimeWrapper>
      <StyledLabel>{labelText}</StyledLabel>
      <CountdownTimeDisplay onPress={onChangeIsOpen} hours={defaultHours} minutes={defaultMinutes} />

      {isOpen && (
        <TimerPickerModal
          visible={isOpen}
          setIsVisible={onChangeIsOpen}
          onConfirm={onConfirm}
          modalTitle={modalTitle}
          onCancel={onChangeIsOpen}
          closeOnOverlayPress
          styles={{
            theme: "light",
          }}
          modalProps={{
            overlayOpacity: 0.8,
          }}
          hideSeconds
          initialHours={defaultHours}
          initialMinutes={defaultMinutes}
        />
      )}
    </StyledSelectTimeWrapper>
  );
};

export default Countdown;
