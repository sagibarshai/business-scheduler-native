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
import { useAppSelector } from "../../../../../../redux/store";

const SubCategories = ({ subCategories, setSubCategories, error }: Props) => {
  const businessData = useAppSelector((state) => state.business.data);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [lastActionData, setLastActionData] = useState<{
    value: "add" | "remove" | "add-other-category" | null;
    optionName: string | null;
  }>({ value: null, optionName: null });

  const [tableData, setTableData] = useState<Record<string, React.ReactNode>[]>([]);
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
    if (lastActionData.value === "add-other-category") {
      updatedSubCategories[updatedSubCategories.length - 1] = selectedSubCategoryData;
    } else if (existSubCategoryIndex === -1) updatedSubCategories.push(selectedSubCategoryData);
    else updatedSubCategories[existSubCategoryIndex] = selectedSubCategoryData;
    setSubCategories(updatedSubCategories);
    setLastActionData({ ...lastActionData, value: null });
    setOverrideContent(null);
  };

  const onCancelCategoryForm = (selectedSubCategoryData: SubCategoryState) => {
    const updatedSubCategories = [...subCategories];
    const existSubCategoryIndex = updatedSubCategories.findIndex(
      (sub) => sub.name.value === selectedSubCategoryData.name.value
    );
    if (existSubCategoryIndex === -1 && lastActionData.value === "add") return;

    if (lastActionData.value === "add-other-category") {
      updatedSubCategories.pop();
    } else {
      updatedSubCategories[existSubCategoryIndex] = {
        ...selectedSubCategoryData,
        isSelected: false,
      };
    }
    setSubCategories(updatedSubCategories);
    setOverrideContent(null);
    setLastActionData({ ...lastActionData, value: null });
  };

  useEffect(() => {
    if (lastActionData.value === "add" || lastActionData.value === "add-other-category") {
      let subCategoryData = subCategories.find(
        (sub) => sub.name.value === lastActionData.optionName
      );

      if (!subCategoryData) {
        // אחר
        subCategoryData = subCategories.find(
          (sub) => sub.name.value === selectedSubCategories[selectedSubCategories.length - 1]
        );
      }

      if (!subCategoryData) return;
      setOverrideContent(
        <SubCategoriesForm
          disallowServicesNames={options}
          onCancel={onCancelCategoryForm}
          onSave={onSaveCategoryForm}
          subCategoryData={subCategoryData}
          isNameEditable={lastActionData.value === "add-other-category" || false}
        />
      );
    }
  }, [lastActionData.value]);

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
    if (option === "אחר") {
      setSubCategories((prev) => [
        ...prev,
        {
          time: {
            value: {
              hours: 0,
              minutes: 30,
            },
          },
          price: {
            value: 50,
          },
          name: {
            value: "",
          },
          isSelected: true,
          isValid: false,
        },
      ]);
      setLastActionData({ value: "add-other-category", optionName: option });
      return;
    }

    // do not send here 'אחר' options
    let updatedSubCategories = [...subCategories];

    const itemIndex = updatedSubCategories.findIndex((sub) => sub.name.value === option);

    if (itemIndex >= 0 && updatedSubCategories[itemIndex].isSelected) {
      // remove
      updatedSubCategories[itemIndex].isSelected = false;
      setLastActionData({ value: "remove", optionName: option });
    } else {
      // add
      updatedSubCategories[itemIndex].isSelected = true;
      setLastActionData({ value: "add", optionName: option });
    }
    setSubCategories(updatedSubCategories);
  };

  const selectedSubCategories = useMemo(() => {
    const selected = [];

    for (let i = 0; i < subCategories.length; i++) {
      if (subCategories[i].isSelected) selected.push(subCategories[i].name.value);
    }
    return selected;
  }, [subCategories, businessData.subCategories]);

  const options = useMemo(() => {
    const options = subCategories.map(({ name }) => name.value);
    options.push("אחר");
    return options;
  }, [subCategories]);

  useEffect(() => {
    const data: Record<string, React.ReactNode>[] = subCategories
      .filter((sub) => sub.isSelected)
      .map((sub) => {
        let parsedTime: string = "";
        if (sub.time.value.hours >= 1) {
          parsedTime += ` ${sub.time.value.hours} שעות `;
        }
        if (sub.time.value.minutes >= 1) {
          parsedTime += ` ${sub.time.value.minutes} דקות `;
        }

        return {
          name: sub.name.value,
          time: parsedTime,
          price: `₪ ${sub.price.value}`,
        };
      });
    setTableData(data);
  }, [subCategories]);

  useEffect(() => {
    const data: Record<string, React.ReactNode>[] = businessData.subCategories.map((sub) => {
      let parsedTime: string = "";
      if (sub.defaultTime.hours >= 1) {
        parsedTime += ` ${sub.defaultTime.hours} שעות `;
      }
      if (sub.defaultTime.minutes >= 1) {
        parsedTime += ` ${sub.defaultTime.minutes} דקות `;
      }

      return {
        name: sub.name,
        time: parsedTime,
        price: `₪ ${sub.price}`,
      };
    });
    setTableData(data);

    const updatedSubCategories = [...subCategories];
    for (let sub of updatedSubCategories) {
      const isExist = businessData.subCategories.map((s) => s.name === sub.name.value);
      if (isExist) sub.isSelected = true;
    }
    setSubCategories(updatedSubCategories);
    setIsDropdownOpen(true);
  }, []);

  const onClickTableRow = (index: number) => {
    setIsDropdownOpen(true);
    const selectedName = selectedSubCategories[index];

    const selectedSubCategory = subCategories.find((sub) => sub.name.value === selectedName);
    if (!selectedSubCategory) return;
    setOverrideContent(
      <SubCategoriesForm
        disallowServicesNames={options}
        onCancel={onCancelCategoryForm}
        onSave={onSaveCategoryForm}
        subCategoryData={selectedSubCategory}
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
          disabledClose={overrideContent === null ? false : true}
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
        {error && tableData.length === 0 && <StyledErrorMessage>{error}</StyledErrorMessage>}
      </StyledPlusButtonWrapper>
    </StyledSubCategoriesWrapper>
  );
};
export default SubCategories;
