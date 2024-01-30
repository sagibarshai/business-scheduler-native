import { useState } from "react";
import { theme } from "../../../../theme";
import TextInput from "../../inputs/text";
import { InputState } from "../../inputs/types";
import { StyledIconWrapper, StyledTitle, StyledWrapper } from "./styled";
import { Props } from "./types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { emailErrorMessage, passwordErrorMessage } from "./errors";
// briefcase-clock-outline
const SignUp = ({}: Props) => {
  const [email, setEmail] = useState<InputState<string>>({ error: emailErrorMessage, value: "", isEditMode: false });
  const [password, setPassword] = useState<InputState<string>>({ error: passwordErrorMessage, value: "", isEditMode: false });
  const [firstName, setFirstName] = useState<InputState<string>>({ error: "", value: "", isEditMode: false });
  const [lastName, setLastName] = useState<InputState<string>>({ error: "", value: "", isEditMode: false });

  const onEmailChange = (text: string) => setEmail({ ...email, value: text });
  const onPasswordChange = (text: string) => setPassword({ ...password, value: text });
  const onFirstNameChange = (text: string) => setFirstName({ ...firstName, value: text });
  const onLastNameChange = (text: string) => setLastName({ ...lastName, value: text });

  return (
    <StyledWrapper>
      <StyledIconWrapper>
        <MaterialCommunityIcons size={100} name="briefcase-clock-outline" color={theme.icons.colors.aqua} />
      </StyledIconWrapper>
      <StyledTitle>ברוך הבא אל Bazzy</StyledTitle>
      <TextInput label="אימייל" onChange={() => {}} icon={<MaterialIcons name="alternate-email" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />} error={email.error} />
    </StyledWrapper>
  );
};
export default SignUp;
