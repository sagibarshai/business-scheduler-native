import { StyledTableWrapper, StyledCol, StyledRow, StyledText } from "./styled";
import { Props } from "./types";

const Table = ({ data, customHeaders, columnSizes }: Props) => {
  if (!data.length && !customHeaders) return <StyledTableWrapper></StyledTableWrapper>;
  const headers = customHeaders ? customHeaders : Object.keys(data[0]);
  return (
    <StyledTableWrapper>
      <StyledRow>
        {headers.map((header, index) => (
          <StyledCol flex={columnSizes ? columnSizes[index] : undefined} isHeader key={header}>
            <StyledText isHeader>{header}</StyledText>
          </StyledCol>
        ))}
      </StyledRow>
      {data.map((item, inx) => {
        const values = Object.values(item);
        return (
          <StyledRow key={inx}>
            {values.map((value, index) => (
              <StyledCol key={index} flex={columnSizes ? columnSizes[index] : undefined}>
                <StyledText>{value}</StyledText>
              </StyledCol>
            ))}
          </StyledRow>
        );
      })}
    </StyledTableWrapper>
  );
};
export default Table;
