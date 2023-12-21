import { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import RTLText from "../../RTL/text";
import { ScrollView } from "react-native";
import { theme } from "../../../../theme";

interface StyledProps {
  width?: string;
  height?: string;
}

interface Props extends StyledProps {
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const DropdownContainer = styled.View<StyledProps>`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : props.theme.inputs.sizes.m.height)};
  z-index: 10;
`;

const DropdownButton = styled.TouchableOpacity`
  padding: 10px;
  display: flex;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spaces.m};
`;

const DropdownList = styled.View<StyledProps>`
  position: absolute;
  top: 40px; /* Adjust the top position as needed */
  border: ${(props) => props.theme.border.width.m} ${(props) => props.theme.border.style.regular} ${(props) => props.theme.border.colors.black};
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-height: 250px;
`;

const DropdownItem = styled.TouchableOpacity`
  margin: 8px;
`;
const StyledOption = styled(RTLText)`
  font-weight: ${(props) => props.theme.fonts.weights.m};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;
const StyledDropdownText = styled(RTLText)`
  font-weight: ${(props) => props.theme.fonts.weights.l};
  font-size: ${(props) => props.theme.fonts.sizes.m};
`;

const StyledHr = styled.View`
  background-color: ${(props) => props.theme.palette.colors.lights.backgrounds.black};
  opacity: 0.1;
  width: 100%;
  height: 1px;
  margin-top: 8px;
`;
export const Dropdown = ({ options, width, height, isOpen, onToggle }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("קטגוריה");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onToggle();
  };

  return (
    <DropdownContainer height={height} width={width}>
      <DropdownButton onPress={onToggle}>
        <StyledDropdownText>{selectedOption}</StyledDropdownText>
        <Icon color={theme.icons.colors.aqua} size={theme.icons.sizes.m} name="chevron-down" />
      </DropdownButton>
      {isOpen && (
        <DropdownList height={height} width={width}>
          <ScrollView>
            {options.map((option) => (
              <DropdownItem key={option} onPress={() => handleSelectOption(option)}>
                <StyledOption>{option}</StyledOption>
                <StyledHr />
              </DropdownItem>
            ))}
          </ScrollView>
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
