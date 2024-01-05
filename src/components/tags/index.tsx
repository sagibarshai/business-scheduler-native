import { StyledTagText, StyledTagWrapper } from "./styled";

import { type Props } from "./types";

const Tag = ({ text, onPress }: Props) => {
  return (
    <StyledTagWrapper onPress={onPress}>
      <StyledTagText>{text}</StyledTagText>
    </StyledTagWrapper>
  );
};
export default Tag;
