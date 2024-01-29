import { ScrollView } from "react-native";
import Progressbar from "../../../../components/progress-bar";
import { StyledStage3Wrapper } from "./styled";
import { useEffect, useRef, useState } from "react";
import SubCategories from "./sub-categories";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";
import { SubCatogory } from "./sub-categories/types";
import { subCategoriesIsEmptyErrorMessage } from "./errors/messages";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector, useAppDispatch } from "../../../../../redux/store";
import { setBusinessData } from "../../../../../redux/featuers/business/businessSlice";
import { useRoute } from "@react-navigation/native";

const Satge3 = () => {
  const dispatch = useAppDispatch();
  const businessData = useAppSelector((state) => state.business.data);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCatogory[]>(businessData.subCategories);
  const [isSubCategoryValid, setIsSubCategoryValid] = useState<boolean>(true);

  const [subcategories, setSubCategories] = useState<SubCatogory[]>([
    { name: "תספורת אישה", price: null, time: null },
    { name: "תספורת גבר", price: null, time: null },
    { name: "תספורת ילד", price: null, time: null },
    { name: "מחליק", price: null, time: null },
  ]);

  const route = useRoute();

  //TODO FIX TS
  //@ts-ignore
  const isEditMode = route.params?.editMode;
  const onNextStage = async () => {
    const isFormValid = checkFromValidity();
    if (!isFormValid) return;
    const updateDataPromise = new Promise<void>((resolve) => {
      dispatch(setBusinessData({ ...businessData, subCategories: selectedSubCategories }));
      resolve();
    });
    await updateDataPromise;

    navigation.navigate("business-profile");
  };

  const checkFromValidity = (): boolean => {
    let isValid = true;
    if (selectedSubCategories.length === 0) {
      isValid = false;
      setIsSubCategoryValid(false);
    } else {
      setIsSubCategoryValid(true);
    }

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
        {!isEditMode ? "לשלב הבא" : "שמור"}
      </NextStageButton>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
