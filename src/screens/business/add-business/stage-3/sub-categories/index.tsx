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
import { SubCategoryState } from "../types";

const SubCategories = ({ subCategories, setSubCategories, error }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [lastActionType, setLastActionType] = useState<"add" | "remove" | null>(null);

  const [overrideContent, setOverrideContent] = useState<React.ReactNode>(null);

  const onToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
    setOverrideContent(null);
  }, [isDropdownOpen]);

  const onSaveCategoryForm = (selectedSubCategoryData: SubCategoryState) => {
    const updatedSubCategories = [...subCategories];
    const existSubCategoryIndex = updatedSubCategories.findIndex(
      (sub) => sub.name.value === selectedSubCategoryData.name.value
    );
    if (existSubCategoryIndex === -1) return;
    updatedSubCategories[existSubCategoryIndex] = selectedSubCategoryData;
    setSubCategories(updatedSubCategories);
    setLastActionType(null);
    setOverrideContent(null);
  };

  const onCancelCategoryForm = (selectedSubCategoryData: SubCategoryState) => {
    const updatedSubCategories = [...subCategories];
    const existSubCategoryIndex = updatedSubCategories.findIndex(
      (sub) => sub.name.value === selectedSubCategoryData.name.value
    );
    if (existSubCategoryIndex === -1) return;
    updatedSubCategories[existSubCategoryIndex] = { ...selectedSubCategoryData, isSelected: false };
    setSubCategories(updatedSubCategories);
    setOverrideContent(null);
    setLastActionType(null);
  };

  console.log("overrideContent ", overrideContent);

  useEffect(() => {
    if (lastActionType === "add") {
      const subCategoryData = subCategories.find(
        (sub) => sub.name.value === selectedSubCategories[selectedSubCategories.length - 1]
      );
      if (!subCategoryData) return;
      setOverrideContent(
        <SubCategoriesForm
          onCancel={onCancelCategoryForm}
          onSave={onSaveCategoryForm}
          subCategoryData={subCategoryData}
        />
      );
    }
  }, [lastActionType]);

  const customHeaders: CustomHeader[] = [
    {
      icon: (
        <Icon
          name="hand-extended-outline"
          color={theme.icons.colors.aqua}
          size={theme.icons.sizes.m}
        />
      ),
      value: "שירות",
    },
    {
      icon: (
        <Icon
          name="clock-edit-outline"
          color={theme.icons.colors.aqua}
          size={theme.icons.sizes.m}
        />
      ),
      value: "זמן",
    },
    {
      icon: (
        <IconPrice
          name="currency-exchange"
          color={theme.icons.colors.aqua}
          size={theme.icons.sizes.m}
        />
      ),
      value: "מחיר",
    },
  ];

  const onSelectCategory = (option: string) => {
    // do not send here 'אחר' options
    let updatedSubCategories = [...subCategories];

    const itemIndex = updatedSubCategories.findIndex((sub) => sub.name.value === option);

    if (itemIndex >= 0 && updatedSubCategories[itemIndex].isSelected) {
      // remove
      updatedSubCategories[itemIndex].isSelected = false;
      setLastActionType("remove");
    } else {
      // add
      updatedSubCategories[itemIndex].isSelected = true;
      setLastActionType("add");
    }
    setSubCategories(updatedSubCategories);
  };

  const selectedSubCategories = useMemo(() => {
    const selected = [];
    for (let i = 0; i < subCategories.length; i++) {
      if (subCategories[i].isSelected) selected.push(subCategories[i].name.value);
    }
    return selected;
  }, [subCategories]);

  const options = useMemo(() => {
    const options = subCategories.map(({ name }) => name.value);
    return options;
  }, [subCategories]);

  const tableData = useMemo(() => {
    const data: Record<string, React.ReactNode>[] = subCategories
      .filter((sub) => sub.isSelected)
      .map((sub) => ({
        name: sub.name.value,
        time: sub.time.value.hours + "שעות" + sub.time.value.minutes + "דקות",
        price: sub.price.value,
      }));

    return data;
  }, [subCategories]);

  const onClickTableRow = (index: number) => {
    setIsDropdownOpen(true);
    setOverrideContent(
      <SubCategoriesForm
        onCancel={onCancelCategoryForm}
        onSave={onSaveCategoryForm}
        subCategoryData={subCategories[index]}
        openTimeOnMount={false}
      />
    );
  };

  return (
    <StyledSubCategoriesWrapper>
      <Table
        onClickRow={onClickTableRow}
        data={tableData}
        customHeaders={customHeaders}
        columnSizes={[2, 2, 1]}
      />
      {isDropdownOpen && (
        <Dropdown
          showDropdownButton={false}
          height="65%"
          overrideContent={overrideContent}
          isOpen={isDropdownOpen}
          error=""
          icon={<TouchableOpacity />}
          label="שירותי העסק"
          onSelect={onSelectCategory}
          onToggle={onToggleDropdown}
          placeholder="חפש..."
          options={options}
          selectedCategories={selectedSubCategories}
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
