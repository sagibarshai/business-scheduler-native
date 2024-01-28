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

  useEffect(() => {
    if (isSubCategoryAdded) {
      setOverrideContent(<SubCategoriesForm subCategoryData={selectedSubCategories[selectedSubCategories.length - 1]} onCancel={onCancelSelectCategory} onSave={onSaveCategoryForm} />);
    }
    setIsSubCategoryAdded(false);
  }, [selectedSubCategories, isSubCategoryAdded]);

  const onToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, [isDropdownOpen]);

  const transformedSubcategories = useMemo(
    () =>
      selectedSubCategories.map(({ name, price, time }) => ({
        service: name,
        price: price,
        time: `שעות : ${time?.hours} דקות: ${time?.minutes}`,
      })),
    [selectedSubCategories]
  );

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
  return (
    <StyledSubCategoriesWrapper>
      <StyledPlusButtonWrapper>
        <PlusButton onPress={onToggleDropdown} />
      </StyledPlusButtonWrapper>
      <Table data={transformedSubcategories} customHeaders={["שירות", "מחיר", "כמה זמן ?"]} columnSizes={[2, 1, 1]} />
      {isDropdownOpen && <Dropdown height="60%" overrideContent={overrideContent} isOpen={isDropdownOpen} error="" icon={<TouchableOpacity />} label="שירותי העסק" onSelect={onSelectSubCategory} onToggle={onToggleDropdown} placeholder="חפש..." options={subCategories.map((subCategory) => subCategory.name)} selectedCategories={selectedSubCategories.map((selectedSubCategory) => selectedSubCategory.name)} />}
    </StyledSubCategoriesWrapper>
  );
};
export default SubCategories;
