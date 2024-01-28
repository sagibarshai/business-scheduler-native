import { StyledLabel, StyledRow, StyledSelectTimeWrapper } from "./styled";
import { useState } from "react";
import { CountdownProps, type Props } from "./types";
import { TimerPickerModal } from "react-native-timer-picker";
import CountdownTimeDisplay from "../countdown-time-display";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../theme";

const Countdown = ({ onSubmit, defaultHours, defaultMinutes, labelText, modalTitle, icon }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onChangeIsOpen = () => setIsOpen((prevState) => !prevState);
  const onConfirm = (data: CountdownProps) => {
    onSubmit(data);
    onChangeIsOpen();
  };

  return (
    <StyledSelectTimeWrapper>
      <StyledRow>
        {icon ? icon : <Icon size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="clock-edit-outline" />}
        <StyledLabel>{labelText}</StyledLabel>
      </StyledRow>
      <CountdownTimeDisplay width="30%" onPress={onChangeIsOpen} hours={defaultHours} minutes={defaultMinutes} />

      {isOpen && (
        <TimerPickerModal
          padWithNItems={2}
          visible={isOpen}
          setIsVisible={onChangeIsOpen}
          onConfirm={onConfirm}
          modalTitle={modalTitle}
          closeOnOverlayPress={false}
          styles={{
            theme: "light",
          }}
          modalProps={{
            overlayOpacity: 0.8,
          }}
          hideSeconds
          initialHours={defaultHours}
          initialMinutes={defaultMinutes}
          confirmButtonText="אישור"
          cancelButtonText="ביטול"
          hourLabel="ש׳"
          minuteLabel="דק׳"
          hideCancelButton
        />
      )}
    </StyledSelectTimeWrapper>
  );
};

export default Countdown;
