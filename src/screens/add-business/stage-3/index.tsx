import { ScrollView } from "react-native";
import Progressbar from "../../../components/progress-bar";
import { StyledStage3Wrapper } from "./styled";
import { useRef } from "react";

const Satge3 = () => {
  const scrollableRef = useRef<ScrollView>(null);

  return (
    <StyledStage3Wrapper>
      <ScrollView ref={scrollableRef}>
        <Progressbar currentStage={3} stages={5} />
      </ScrollView>
    </StyledStage3Wrapper>
  );
};

export default Satge3;
