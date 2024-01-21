import { ScrollView } from "react-native";
import Progressbar from "../../../components/progress-bar";
import { StyledStage3Wrapper } from "./styled";
import { useRef, useState } from "react";
import SubCategories from "./sub-categories";
import NextStageButton from "../../../components/inputs/buttons/next-stage-button";
import { SubCatogory } from "./sub-categories/types";

const Satge3 = () => {
  const scrollableRef = useRef<ScrollView>(null);
  const [subcategories, setSubCategories] = useState<SubCatogory[]>([
    { name: "תספורת אישה", price: null, time: null },
    { name: "תספורת גבר", price: null, time: null },
    { name: "תספורת ילד", price: null, time: null },
    { name: "מחליק", price: null, time: null },
  ]);

  const onNextStage = () => {};

  return (
    <StyledStage3Wrapper>
      <Progressbar currentStage={3} stages={5} />
      <SubCategories subCategories={subcategories} />
      <NextStageButton onNextStage={onNextStage} disabled={false}>
        לשלב הבא
      </NextStageButton>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
