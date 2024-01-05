import UploadImags from "./upload-images";
import NextStageButton from "../../../components/inputs/buttons/next-stage-button";

import { StyledStage2Wrapper } from "./styled";

const Stage2 = () => {
  const onNextStage = () => {};

  return (
    <StyledStage2Wrapper>
      <UploadImags />
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        לשלב הבא
      </NextStageButton>
    </StyledStage2Wrapper>
  );
};
export default Stage2;
