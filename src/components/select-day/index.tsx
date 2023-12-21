import styled, {css} from 'styled-components/native';

interface StyledProps {
  selected: boolean;
  disabled: boolean;
}
interface Props extends StyledProps {
  dayText: string;
  onTouch: React.Dispatch<React.SetStateAction<any>>;
}

const StyledDayWrapper = styled.View<StyledProps>`
  width: 42px;
  height: 42px;
  border-radius: 100px;
  background-color: ${props => {
    if (props.disabled)
      return props.theme.palette.colors.lights.backgrounds.disabledGray;
    else if (props.selected)
      return props.theme.palette.colors.lights.backgrounds.aqua;
    else if (!props.selected) return 'transparent';
  }};

  display: flex;
  align-items: center;
  justify-content: center;
  border: ${props =>
    props.selected
      ? 'none'
      : css`
          ${props => props.theme.border.width.m}
          ${props => props.theme.border.style.regular}
    ${props => props.theme.border.colors.black}
        `};
`;

const StyledDayText = styled.Text<Omit<StyledProps, 'disabled'>>`
  color: ${props => {
    if (!props.selected || props.disabled)
      return props.theme.palette.colors.lights.texts.black;
    else return props.theme.palette.colors.lights.texts.white;
  }};
  font-weight: ${props => props.theme.fonts.weights.l};
`;

const Day = ({selected, dayText, onTouch, disabled}: Props) => {
  return (
    <StyledDayWrapper
      disabled={disabled}
      onTouchEnd={disabled ? () => {} : onTouch}
      selected={selected}>
      <StyledDayText disabled={disabled} selected={selected}>
        {dayText}
      </StyledDayText>
    </StyledDayWrapper>
  );
};

export default Day;
