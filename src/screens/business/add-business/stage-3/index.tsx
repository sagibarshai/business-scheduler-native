import Progressbar from "../../../../components/progress-bar";
import { StyledStage3Wrapper } from "./styled";
import { useEffect, useState } from "react";
import NextStageButton from "../../../../components/inputs/buttons/next-stage-button";

import { useAppSelector, useAppDispatch } from "../../../../../redux/store";
import { setBusinessData } from "../../../../../redux/featuers/business/businessSlice";
import { useAppRouteParams } from "../../../../hooks/use-app-route-params";
import { RootStackParamList } from "../../../../../types";
import { useAppNavigation } from "../../../../hooks/use-app-navigation";
import { SubCatogory } from "./sub-categories/types";
import { InputState } from "../../../../components/inputs/types";
import { appAxios } from "../../../../../axios";
import { AxiosError } from "axios";
import SubCategories from "./sub-categories";
import { SubCategoryState } from "./types";

const Satge3 = () => {
  const dispatch = useAppDispatch();
  const businessData = useAppSelector((state) => state.business.data);
  const businessMetaData = useAppSelector((state) => state.business.metaData);
  const navigation = useAppNavigation();

  const user = useAppSelector((state) => state.user);

  const params = useAppRouteParams({ screen: "stage-3" }) as RootStackParamList["stage-3"];

  const [subcategories, setSubCategories] = useState<SubCategoryState[]>([]);

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

      const responseSubCategory = categoriesResponse.data.subCategories.flatMap((subCategoryData) =>
        subCategoryData.map((sub) => sub)
      );

      const parsedSubCategories: SubCategoryState[] = responseSubCategory.map((sub) => ({
        isSelected: false,
        isValid: false,
        name: { value: sub.name, isValid: false },
        price: { value: sub.price, isValid: false },
        time: { value: sub.defaultTime, isValid: false },
      }));
      setSubCategories(parsedSubCategories);
    } catch (err) {
      const error = err as AxiosError;
      console.log("err ", error.response?.data);
      if (error.response?.status === 401) navigation.navigateTo("auth");
    }
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  const onNextStage = async () => {
    // const isFormValid = checkFromValidity();
    // if (!isFormValid) return;
    // const updateDataPromise = new Promise<void>((resolve) => {
    //   dispatch(setBusinessData({ ...businessData, subCategories: selectedSubCategories }));
    //   resolve();
    // });
    // await updateDataPromise;
    // navigation.navigateTo("business-profile");
  };

  // const checkFromValidity = (): boolean => {
  //   let isValid = true;
  //   if (selectedSubCategories.length === 0) {
  //     isValid = false;
  //     setIsSubCategoryValid(false);
  //   } else {
  //     setIsSubCategoryValid(true);
  //   }

  //   return isValid;
  // };

  // useEffect(() => {
  //   if (selectedSubCategories.length) setIsSubCategoryValid(true);
  // }, [selectedSubCategories]);

  if (!subcategories.length) return <StyledStage3Wrapper />;

  return (
    <StyledStage3Wrapper>
      <Progressbar currentStage={3} stages={4} />
      <SubCategories setSubCategories={setSubCategories} error={""} subCategories={subcategories} />
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        {!params?.isEditMode ? "לשלב הבא" : "שמור"}
      </NextStageButton>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
