import styled, { css } from "styled-components/native";
import RTLText from "../RTL/text";
import RTLRow from "../RTL/row";

interface StyledProps {
  width: string;
}
interface Props {
  stages: number;
  currentStage: number;
}

const StyledProgressbarWrapper = styled.View`
  width: 85%;
  height: 11px;
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => props.theme.border.colors.aqua};
  background-color: transparent;
  position: relative;
  border-radius: ${(props) => props.theme.border.radiuses.xl};
`;

const StyledProgress = styled.View<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.palette.colors.lights.backgrounds.aqua};
  width: ${(props) => props.width};
  height: 10px;
  border-radius: ${(props) => props.theme.border.radiuses.xl};
`;

const StyledRow = styled(RTLRow)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const StyledText = styled(RTLText)`
  color: ${(props) => props.theme.palette.colors.lights.texts.aqua};
  font-size: ${(props) => props.theme.fonts.sizes.l};
  font-weight: ${(props) => props.theme.fonts.weights.l};
  width: 15%;
`;

const Progressbar = ({ stages, currentStage }: Props) => {
  if (currentStage > stages || stages === 0) throw new Error("Invalid values");
  const width = `${(currentStage / stages) * 100}%`;
  return (
    <StyledRow>
      <StyledProgressbarWrapper>
        <StyledProgress width={width} />
      </StyledProgressbarWrapper>
      <StyledText>
        {currentStage} / {stages}
      </StyledText>
    </StyledRow>
  );
};
export default Progressbar;
