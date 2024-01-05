import { StyledIconWrapper, StyledKey, StyledKeyValueColumn, StyledRow, StyledValue } from "./styled";
import { Props } from "./types";

const KeyValueColumn = ({ keyText, iconKey, value }: Props) => {
  return (
    <StyledKeyValueColumn>
      <StyledRow>
        <StyledIconWrapper>{iconKey}</StyledIconWrapper>
        <StyledKey>{keyText}</StyledKey>
      </StyledRow>
      {typeof value === "object" ? (
        <StyledRow>{value}</StyledRow>
      ) : (
        <StyledRow>
          <StyledValue>{value}</StyledValue>
        </StyledRow>
      )}
    </StyledKeyValueColumn>
  );
};
export default KeyValueColumn;
