import { StyledTableWrapper, StyledCol, StyledRow, StyledText } from "./styled";
import { Props } from "./types";

const Table = ({ tableData }: Props) => {
  if (!tableData.length) return <StyledTableWrapper />;
  const headers = Object.keys(tableData[0]);
  return (
    <StyledTableWrapper>
      <StyledRow>
        {headers.map((header) => (
          <StyledCol isHeader key={header}>
            <StyledText isHeader>{header}</StyledText>
          </StyledCol>
        ))}
      </StyledRow>
      <StyledRow>
        {tableData.map((item) => {
          const values = Object.values(item);
          return values.map((value) => (
            <StyledCol>
              <StyledText>{value}</StyledText>
            </StyledCol>
          ));
        })}
      </StyledRow>
    </StyledTableWrapper>
  );
};
export default Table;
