import { type Props } from "./types";

import { StyledProgress, StyledProgressbarWrapper, StyledRow, StyledText } from "./styled";

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
