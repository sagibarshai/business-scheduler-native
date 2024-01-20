import { ScrollView } from "react-native";
import { StyledSubCategoriesWrapper } from "./styled";
import { Props } from "./types";
import Table from "../../../../components/table";

const SubCategories = ({ categories }: Props) => {
  const tableData = [
    {
      service: "תספורת גבר",
      price: 60,
      time: 15,
    },
  ];
  return (
    <StyledSubCategoriesWrapper>
      <Table tableData={tableData} />
    </StyledSubCategoriesWrapper>
  );
};
export default SubCategories;
