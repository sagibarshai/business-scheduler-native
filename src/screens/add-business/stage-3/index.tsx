import { ScrollView, View } from "react-native";
import Progressbar from "../../../components/progress-bar";
import { StyledStage3Wrapper } from "./styled";
import { useRef } from "react";
import { useAppSelector } from "../../../../redux/store";

const Satge3 = () => {
  const scrollableRef = useRef<ScrollView>(null);
  const business = useAppSelector((state) => state.business);

  console.log("business", business);

  return (
    <StyledStage3Wrapper>
      <ScrollView ref={scrollableRef}>
        <Progressbar currentStage={3} stages={5} />
      </ScrollView>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
