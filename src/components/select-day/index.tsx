import styled, {css} from 'styled-components/native';

interface StyledProps {
  selected: boolean;
}
interface Props extends StyledProps {
  dayText: string;
  onTouch: React.Dispatch<React.SetStateAction<any>>;
}

const StyledDayWrapper = styled.View<StyledProps>`
  width: 42px;
  height: 42px;
  border-radius: 100px;
  background-color: ${props =>
    props.selected
      ? props.theme.palette.colors.lights.backgrounds.aqua
      : 'transparent'};
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

const StyledDayText = styled.Text<StyledProps>`
  color: ${props =>
    props.selected
      ? props.theme.palette.colors.lights.texts.white
      : props.theme.palette.colors.lights.texts.black};
  font-weight: ${props => props.theme.fonts.weights.l};
`;

const Day = ({selected, dayText, onTouch}: Props) => {
  return (
    <StyledDayWrapper onTouchEnd={onTouch} selected={selected}>
      <StyledDayText selected={selected}>{dayText}</StyledDayText>
    </StyledDayWrapper>
  );
};

export default Day;
