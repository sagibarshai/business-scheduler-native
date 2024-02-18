import { StyledTableWrapper, StyledCol, StyledRow, StyledText, StyledHeaderRow } from "./styled";
import { Props } from "./types";

const Table = ({ data, customHeaders, columnSizes, onClickRow = () => {} }: Props) => {
  if (!data || (!data.length && !customHeaders)) return <StyledTableWrapper />;
  const headers = customHeaders ? customHeaders : Object.keys(data[0]);

  return (
    <StyledTableWrapper>
      <StyledRow>
        {headers.map((header, index) => {
          return (
            <StyledCol
              flex={columnSizes ? columnSizes[index] : undefined}
              isHeader
              key={typeof header === "string" ? header : header.value}
            >
              <StyledHeaderRow>
                {typeof header === "string" ? "" : header.icon}
                <StyledText isHeader>
                  {typeof header === "string" ? header : header.value}
                </StyledText>
              </StyledHeaderRow>
            </StyledCol>
          );
        })}
      </StyledRow>
      {data.map((item, inx) => {
        const values = Object.values(item);
        return (
          <StyledRow key={inx} onTouchStart={() => onClickRow(inx)}>
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
