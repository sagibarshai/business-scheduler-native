import Progressbar from "../../../../components/progress-bar";
import { StyledStage3Wrapper } from "./styled";
import { useEffect, useRef, useState } from "react";
import SubCategories from "./sub-categories";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";
import { SubCatogory } from "./sub-categories/types";
import { subCategoriesIsEmptyErrorMessage } from "./errors/messages";

import { useAppSelector, useAppDispatch } from "../../../../../redux/store";
import { setBusinessData } from "../../../../../redux/featuers/business/businessSlice";
import { useAppRouteParams } from "../../../../hooks/use-app-route-params";
import { RootStackParamList } from "../../../../../types";
import { appAxios } from "../../../../../axios";
import { AxiosError } from "axios";
import { useAppNavigation } from "../../../../hooks/use-app-navigation";

const Satge3 = () => {
  const dispatch = useAppDispatch();
  const businessData = useAppSelector((state) => state.business.data);
  const navigation = useAppNavigation();
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCatogory[]>(
    businessData.subCategories
  );
  const [isSubCategoryValid, setIsSubCategoryValid] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user);
  const businessMetaData = useAppSelector((state) => state.business.metaData);

  const params = useAppRouteParams({ screen: "stage-3" }) as RootStackParamList["stage-3"];
  const [subcategories, setSubCategories] = useState<SubCatogory[]>([]);

  const getSubCategories = async () => {
    try {
      const categoriesResponse: { data: { subCategories: SubCatogory[][] } } = await appAxios.post(
        "/business/sub-categories-options",
        { categories: businessMetaData.categories },
        {
          headers: {
            Authorization: `Berar ${user.token}`,
          },
        }
      );

      const subCategories = categoriesResponse.data.subCategories.flatMap((subCategoryData) =>
        subCategoryData.map((sub) => sub)
      );

      setSubCategories(subCategories);
    } catch (err) {
      const error = err as AxiosError;
      console.log("err ", error.response?.data);
      if (error.response?.status === 401) navigation.navigateTo("auth");
    }
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  const onAddOptionsToSubCategories = (otherOption: SubCatogory) =>
    setSubCategories([...subcategories, otherOption]);

  const onNextStage = async () => {
    const isFormValid = checkFromValidity();
    if (!isFormValid) return;
    const updateDataPromise = new Promise<void>((resolve) => {
      dispatch(setBusinessData({ ...businessData, subCategories: selectedSubCategories }));
      resolve();
    });
    await updateDataPromise;

    navigation.navigateTo("business-profile");
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

  if (!subcategories.length) return <StyledStage3Wrapper />;

  return (
    <StyledStage3Wrapper>
      <Progressbar currentStage={3} stages={4} />
      <SubCategories
        onAddOptionsToSubCategories={onAddOptionsToSubCategories}
        error={!isSubCategoryValid ? subCategoriesIsEmptyErrorMessage : ""}
        selectedSubCategories={selectedSubCategories}
        setSelectedSubCategories={setSelectedSubCategories}
        subCategories={subcategories}
      />
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        {!params?.isEditMode ? "לשלב הבא" : "שמור"}
      </NextStageButton>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
