import { useState } from "react";
import { theme } from "../../../../theme";
import TextInput from "../../inputs/text";
import { InputState } from "../../inputs/types";
import { StyledIconWrapper, StyledTitle, StyledWrapper, StyledLoginButton, StyledText, StyledRow } from "./styled";
import { Props } from "./types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { emailErrorMessage, passwordErrorMessage } from "./errors";
import { isEmail } from "../../../utils/valitators";
// briefcase-clock-outline
const SignUp = ({}: Props) => {
  const [email, setEmail] = useState<InputState<string>>({ error: emailErrorMessage, value: "", isEditMode: false, isValid: false });
  const [password, setPassword] = useState<InputState<string>>({ error: passwordErrorMessage, value: "", isEditMode: false, isValid: false });
  const [firstName, setFirstName] = useState<InputState<string>>({ error: "", value: "", isEditMode: false, isValid: true });
  const [lastName, setLastName] = useState<InputState<string>>({ error: "", value: "", isEditMode: false, isValid: true });

  const onEmailChange = (text: string) => setEmail({ ...email, value: text, isValid: isEmail(text) });
  const onPasswordChange = (text: string) => setPassword({ ...password, value: text, isValid: text.length >= 8 });
  const onFirstNameChange = (text: string) => setFirstName({ ...firstName, value: text });
  const onLastNameChange = (text: string) => setLastName({ ...lastName, value: text });

  return (
    <StyledWrapper>
      <StyledIconWrapper>
        <MaterialCommunityIcons size={100} name="briefcase-clock-outline" color={theme.icons.colors.aqua} />
      </StyledIconWrapper>
      <StyledTitle>ברוך הבא אל Bazzy</StyledTitle>
      <TextInput
        keyboardType={"email-address"}
        label="אימייל"
        onChange={(event) => onEmailChange(event.nativeEvent.text)}
        icon={<MaterialIcons name="alternate-email" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
        error={email.isValid ? email.error : ""}
      />
      <TextInput
        label="סיסמא"
        onChange={(event) => onPasswordChange(event.nativeEvent.text)}
        icon={<MaterialIcons name="security" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
        error={password.isValid ? password.error : ""}
      />
      <StyledRow>
        <TextInput
          label="שם פרטי"
          onChange={(event) => onFirstNameChange(event.nativeEvent.text)}
          icon={<MaterialIcons name="person" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
          error={""}
          width="40%"
        />
        <TextInput
          label="שם משפחה"
          onChange={(event) => onLastNameChange(event.nativeEvent.text)}
          icon={<MaterialIcons name="people" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
          error={""}
          width="40%"
        />
      </StyledRow>
      <StyledLoginButton>
        <StyledText>צור משתמש</StyledText>
      </StyledLoginButton>
    </StyledWrapper>
  );
};
export default SignUp;
