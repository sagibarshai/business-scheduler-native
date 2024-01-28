import { TouchableOpacity } from "react-native";
import { StyledPlusButtonWrapper, StyledSubCategoriesWrapper } from "./styled";
import { Props, SubCatogory } from "./types";
import Table from "../../../../components/table";
import PlusButton from "../../../../components/inputs/buttons/plus-button";
import Dropdown from "../../../../components/inputs/dropdown";
import { useCallback, useEffect, useMemo, useState } from "react";
import SubCategoriesForm from "./sub-category-form";

const SubCategories = ({ subCategories }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [overrideContent, setOverrideContent] = useState<React.ReactNode>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCatogory[]>([]);
  const [isSubCategoryAdded, setIsSubCategoryAdded] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Record<string, React.ReactNode>[]>([]);

  useEffect(() => {
    // build table data
    const transformedSubcategories = selectedSubCategories.map(({ name, price, time }) => ({
      service: name,
      price: price,
      time: time ? `שעות : ${time?.hours} דקות: ${time?.minutes} ` : "",
    }));
    setTableData(transformedSubcategories);
  }, [selectedSubCategories]);

  useEffect(() => {
    if (isSubCategoryAdded) {
      setOverrideContent(<SubCategoriesForm subCategoryData={selectedSubCategories[selectedSubCategories.length - 1]} onCancel={onCancelSelectCategory} onSave={onSaveCategoryForm} />);
    }
    setIsSubCategoryAdded(false);
  }, [selectedSubCategories, isSubCategoryAdded]);

  const onToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, [isDropdownOpen]);

  const onSelectSubCategory = useCallback(
    (subCategory: string) => {
      let updatedSelectedSubCategories = [...selectedSubCategories];
      const isExist = updatedSelectedSubCategories.find((selectedSubCategory) => selectedSubCategory.name === subCategory);
      if (!isExist) {
        setIsSubCategoryAdded(true);
        updatedSelectedSubCategories.push({ name: subCategory, price: null, time: null });
      } else updatedSelectedSubCategories = updatedSelectedSubCategories.filter((selectedSubCategory) => selectedSubCategory.name !== subCategory);
      setSelectedSubCategories(updatedSelectedSubCategories);
    },
    [selectedSubCategories]
  );
  const onCancelSelectCategory = (categoryData: SubCatogory) => {
    setSelectedSubCategories((prevSelectedSubCategories) => [...prevSelectedSubCategories].filter((selectedSubCategory, index) => index !== prevSelectedSubCategories.length - 1));
    setOverrideContent(null);
  };
  const onSaveCategoryForm = (categoryData: SubCatogory) => {
    const updatedSelectedSubCategories = [...selectedSubCategories];
    // modify the last element
    updatedSelectedSubCategories[updatedSelectedSubCategories.length - 1] = categoryData;

    setSelectedSubCategories(updatedSelectedSubCategories);

    setOverrideContent(null);
  };

  useEffect(() => {
    if (!isDropdownOpen) {
      // reset from form view back to dropdown
      setOverrideContent(null);
      // check if user left form without filling the reinvent fields
      const lastElement = selectedSubCategories[selectedSubCategories.length - 1];
      if (lastElement) {
        if (!lastElement.name || !lastElement.price || !lastElement.time) {
          const updatedSelectedSubCategories = [...selectedSubCategories];
          updatedSelectedSubCategories.pop();
          setSelectedSubCategories(updatedSelectedSubCategories);
        }
      }
    }
  }, [isDropdownOpen]);

  return (
    <StyledSubCategoriesWrapper>
      <StyledPlusButtonWrapper>
        <PlusButton onPress={onToggleDropdown} />
      </StyledPlusButtonWrapper>
      <Table data={tableData} customHeaders={["שירות", "מחיר", "כמה זמן ?"]} columnSizes={[2, 1, 1]} />
      {isDropdownOpen && <Dropdown height="60%" overrideContent={overrideContent} isOpen={isDropdownOpen} error="" icon={<TouchableOpacity />} label="שירותי העסק" onSelect={onSelectSubCategory} onToggle={onToggleDropdown} placeholder="חפש..." options={subCategories.map((subCategory) => subCategory.name)} selectedCategories={selectedSubCategories.map((selectedSubCategory) => selectedSubCategory.name)} />}
    </StyledSubCategoriesWrapper>
  );
};
export default SubCategories;
