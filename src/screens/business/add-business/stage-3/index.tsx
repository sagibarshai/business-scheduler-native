import { ScrollView } from "react-native";
import Progressbar from "../../../../components/progress-bar";
import { StyledStage3Wrapper } from "./styled";
import { useEffect, useRef, useState } from "react";
import SubCategories from "./sub-categories";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";
import { SubCatogory } from "./sub-categories/types";
import { subCategoriesIsEmptyErrorMessage } from "./errors/messages";

const Satge3 = () => {
  const scrollableRef = useRef<ScrollView>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCatogory[]>([]);
  const [isSubCategoryValid, setIsSubCategoryValid] = useState<boolean>(true);

  const [subcategories, setSubCategories] = useState<SubCatogory[]>([
    { name: "תספורת אישה", price: null, time: null },
    { name: "תספורת גבר", price: null, time: null },
    { name: "תספורת ילד", price: null, time: null },
    { name: "מחליק", price: null, time: null },
  ]);

  const onNextStage = () => {
    const isFormValid = checkFromValidity();
    if (!isFormValid) return;
  };

  const checkFromValidity = (): boolean => {
    let isValid = true;
    if (selectedSubCategories.length === 0) {
      isValid = false;
      setIsSubCategoryValid(false);
    } else setIsSubCategoryValid(true);

    return isValid;
  };

  useEffect(() => {
    if (selectedSubCategories.length) setIsSubCategoryValid(true);
  }, [selectedSubCategories]);

  return (
    <StyledStage3Wrapper>
      <Progressbar currentStage={3} stages={4} />
      <SubCategories error={!isSubCategoryValid ? subCategoriesIsEmptyErrorMessage : ""} selectedSubCategories={selectedSubCategories} setSelectedSubCategories={setSelectedSubCategories} subCategories={subcategories} />
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        לשלב הבא
      </NextStageButton>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
