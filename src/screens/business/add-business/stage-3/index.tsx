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
import { appAxios } from "../../../../../axios";
import { AxiosError } from "axios";
import SubCategories from "./sub-categories";
import { SubCategoryState } from "./types";
import { SelectedHoursAndDays } from "../stage-1/select-days-and-hours/types";

const Satge3 = () => {
  const dispatch = useAppDispatch();
  const businessData = useAppSelector((state) => state.business.data);
  const businessMetaData = useAppSelector((state) => state.business.metaData);
  const navigation = useAppNavigation();
  const business = useAppSelector((state) => state.business);

  const user = useAppSelector((state) => state.user);

  const params = useAppRouteParams({ screen: "stage-3" }) as RootStackParamList["stage-3"];

  const [subcategories, setSubCategories] = useState<SubCategoryState[]>([]);

  const getSubCategories = async () => {
    try {
      const categoriesResponse: { data: { subCategories: SubCatogory[][] } } = await appAxios.post(
        "/business/sub-categories-options",
        { categories: [businessMetaData.category] },
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
        name: { value: sub.name, isValid: false, showErrorMessage: false },
        price: { value: sub.price, isValid: false, showErrorMessage: false },
        time: { value: sub.defaultTime, isValid: false, showErrorMessage: false },
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
    const isFormValid = checkFromValidity();
    if (!isFormValid) return;
    const updateDataPromise = new Promise<void>((resolve) => {
      const selectedSubCategories = subcategories.filter((sub) => sub.isSelected);
      const parsedSelected: SubCatogory[] = selectedSubCategories.map((sub) => ({
        name: sub.name.value,
        price: Number(sub.price.value)!,
        defaultTime: { hours: sub.time.value.hours, minutes: sub.time.value.minutes },
      }));
      dispatch(setBusinessData({ ...businessData, subCategories: parsedSelected }));
      resolve();
    });
    await updateDataPromise;

    navigation.navigateTo("business-profile");
  };

  const checkFromValidity = (): boolean => {
    let isValid = true;
    const selectedSubCategories = subcategories.filter((sub) => sub.isSelected);
    if (selectedSubCategories.length === 0) isValid = false;

    return isValid;
  };

  if (!subcategories.length) return <StyledStage3Wrapper />;

  return (
    <StyledStage3Wrapper>
      <Progressbar currentStage={3} stages={4} />
      <SubCategories
        setSubCategories={setSubCategories}
        error={"יש למלא לפחות תת קטגוריה אחת"}
        subCategories={subcategories}
      />
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        {!params?.isEditMode ? "סיום" : "שמור"}
      </NextStageButton>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
