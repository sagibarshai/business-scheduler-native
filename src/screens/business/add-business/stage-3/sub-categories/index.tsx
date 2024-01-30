import { TouchableOpacity } from "react-native";
import { StyledErrorMessage, StyledPlusButtonWrapper, StyledSubCategoriesWrapper } from "./styled";
import { Props, SubCatogory } from "./types";
import Table from "../../../../../components/table";
import PlusButton from "../../../../../components/inputs/buttons/plus-button";
import Dropdown from "../../../../../components/inputs/dropdown";
import { useCallback, useEffect, useMemo, useState } from "react";
import SubCategoriesForm from "./sub-category-form";
import { CustomHeader } from "../../../../../components/table/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconPrice from "react-native-vector-icons/MaterialIcons";

import { theme } from "../../../../../../theme";

const SubCategories = ({ subCategories, selectedSubCategories, setSelectedSubCategories, error, onAddOptionsToSubCategories }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [overrideContent, setOverrideContent] = useState<React.ReactNode>(null);
  const [isSubCategoryAdded, setIsSubCategoryAdded] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Record<string, React.ReactNode>[]>([]);
  const [selectedTableRowIndex, setSelectedTableRowIndex] = useState<number>(-1);

  useEffect(() => {
    if (selectedTableRowIndex >= 0) {
      setIsDropdownOpen(true);
      setOverrideContent(<SubCategoriesForm openTimeOnMount={false} subCategoryData={selectedSubCategories[selectedTableRowIndex]} onCancel={onCancelSelectCategory} onSave={onSaveCategoryForm} />);
    } else setOverrideContent(null);
  }, [selectedTableRowIndex]);

  useEffect(() => {
    // build table data
    const transformedSubcategories = selectedSubCategories.map(({ name, price, time }) => ({
      service: name,
      time: time ? (
        <>
          {time?.hours ? `${time.hours} ש׳ ,` : ""}
          {time?.minutes ? time?.minutes + "דק" : ""}
        </>
      ) : (
        ""
      ),
      price: price ? `₪ ${price} ` : "",
    }));
    setTableData(transformedSubcategories);
  }, [selectedSubCategories]);

  useEffect(() => {
    if (isSubCategoryAdded) {
      setOverrideContent(
        <SubCategoriesForm
          isNameEditable={selectedSubCategories[selectedSubCategories.length - 1].name === "אחר"}
          subCategoryData={selectedSubCategories[selectedSubCategories.length - 1]}
          onCancel={onCancelSelectCategory}
          onSave={onSaveCategoryForm}
        />
      );
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

    // for case of "other" service
    const isExistOnSubCategories = subCategories.find((sub) => sub.name === categoryData.name);
    if (!isExistOnSubCategories) onAddOptionsToSubCategories(categoryData);
    setOverrideContent(null);
  };

  useEffect(() => {
    if (!isDropdownOpen) {
      // reset from form view back to dropdown
      setOverrideContent(null);
      setSelectedTableRowIndex(-1);
      // check if user left form without filling the reinvent fields
      const lastElement = selectedSubCategories[selectedSubCategories.length - 1];
      if (lastElement) {
        if (
          !lastElement.name ||
          !lastElement.price ||
          (typeof lastElement.time?.hours === "number" && lastElement.time?.hours === 0 && typeof lastElement.time?.minutes === "number" && lastElement.time?.minutes === 0)
        ) {
          const updatedSelectedSubCategories = [...selectedSubCategories];
          updatedSelectedSubCategories.pop();
          setSelectedSubCategories(updatedSelectedSubCategories);
        }
      }
    }
  }, [isDropdownOpen]);

  const customHeaders: CustomHeader[] = [
    {
      icon: <Icon name="hand-extended-outline" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />,
      value: "שירות",
    },
    {
      icon: <Icon name="clock-edit-outline" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />,
      value: "זמן",
    },
    {
      icon: <IconPrice name="currency-exchange" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />,
      value: "מחיר",
    },
  ];

  const onSelectTableRow = (index: number) => setSelectedTableRowIndex(index);
  return (
    <StyledSubCategoriesWrapper>
      <Table onClickRow={onSelectTableRow} data={tableData} customHeaders={customHeaders} columnSizes={[2, 2, 1]} />
      {isDropdownOpen && (
        <Dropdown
          showDropdownButton={false}
          height="65%"
          overrideContent={overrideContent}
          isOpen={isDropdownOpen}
          error=""
          icon={<TouchableOpacity />}
          label="שירותי העסק"
          onSelect={onSelectSubCategory}
          onToggle={onToggleDropdown}
          placeholder="חפש..."
          options={[...subCategories.map((subCategory) => subCategory.name), "אחר"]}
          selectedCategories={selectedSubCategories.map((selectedSubCategory) => selectedSubCategory.name)}
        />
      )}
      <StyledPlusButtonWrapper>
        <PlusButton onPress={onToggleDropdown} />
        {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
      </StyledPlusButtonWrapper>
    </StyledSubCategoriesWrapper>
  );
};
export default SubCategories;
