import { useState } from "react";
import { theme } from "../../../../theme";
import TextInput from "../../inputs/text";
import { InputState } from "../../inputs/types";
import { StyledIconWrapper, StyledTitle, StyledWrapper, StyledLoginButton, StyledText, StyledRow } from "./styled";
import { Props } from "./types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { emailErrorMessage, firstNameErrorMessage, lastNameErrorMessage, passwordErrorMessage, phoneErrorMessage } from "./errors";
import { isEmail, isPhone } from "../../../utils/valitators";
import TelInput from "../../inputs/tel";
import { appAxios } from "../../../../axios";
import { AxiosError } from "axios";
// briefcase-clock-outline
const SignUp = ({}: Props) => {
  const [email, setEmail] = useState<InputState<string>>({ error: emailErrorMessage, value: "", isEditMode: false, isValid: false, showErrorMessage: false });
  const [password, setPassword] = useState<InputState<string>>({ error: passwordErrorMessage, value: "", isEditMode: false, isValid: false, showErrorMessage: false });
  const [firstName, setFirstName] = useState<InputState<string>>({ error: firstNameErrorMessage, value: "", isEditMode: false, isValid: false, showErrorMessage: false });
  const [lastName, setLastName] = useState<InputState<string>>({ error: lastNameErrorMessage, value: "", isEditMode: false, isValid: false, showErrorMessage: false });
  const [phone, setPhone] = useState<InputState<string>>({ error: phoneErrorMessage, value: "", isEditMode: false, isValid: false, showErrorMessage: false });

  const [error, setError] = useState<string>("");

  const onEmailChange = (text: string) => setEmail({ ...email, value: text, isValid: isEmail(text), showErrorMessage: true });
  const onPasswordChange = (text: string) => setPassword({ ...password, value: text, isValid: text.length >= 8, showErrorMessage: true });
  const onFirstNameChange = (text: string) => setFirstName({ ...firstName, value: text, isValid: text.length >= 2, showErrorMessage: true });
  const onLastNameChange = (text: string) => setLastName({ ...lastName, value: text, isValid: text.length >= 2, showErrorMessage: true });
  const onPhoneChange = (text: string) => setPhone({ ...phone, value: text, isValid: isPhone(text), showErrorMessage: true });

  const onSignUp = async () => {
    if (!email.isValid || !password.isValid || !phone.isValid || !firstName.isValid || !lastName.isValid) setError("יש למלא את כל השדות");
    else {
      const body = {
        email: email.value,
        password: password.value,
        phone: phone.value,
        firstName: firstName.value,
        lastName: lastName.value,
        role: "user",
      };
      try {
        const loginResponse = (await appAxios.post("/auth/signup", body)).data;
        console.log("loginResponse ", loginResponse);
      } catch (err) {
        const error = err as AxiosError;
        console.log("err ", error);
      }
    }
  };
  return (
    <StyledWrapper>
      <StyledIconWrapper>{/* <MaterialCommunityIcons size={60} name="briefcase-clock-outline" color={theme.icons.colors.aqua} /> */}</StyledIconWrapper>
      <StyledTitle>ברוך הבא אל Bazzy</StyledTitle>
      <TextInput
        keyboardType={"email-address"}
        label="אימייל"
        onChange={(event) => onEmailChange(event.nativeEvent.text)}
        icon={<MaterialIcons name="alternate-email" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
        error={email.showErrorMessage && !email.isValid ? email.error : ""}
      />
      <TextInput
        textContentType="newPassword"
        label="סיסמא"
        onChange={(event) => onPasswordChange(event.nativeEvent.text)}
        icon={<MaterialIcons name="security" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
        error={password.showErrorMessage && !password.isValid ? password.error : ""}
      />
      <TelInput
        label="טלפון"
        onChange={(event) => onPhoneChange(event.nativeEvent.text)}
        icon={<MaterialCommunityIcons size={theme.icons.sizes.m} color={theme.icons.colors.aqua} name="phone-check-outline" />}
        error={phone.showErrorMessage && !phone.isValid ? phone.error : ""}
      />
      <StyledRow>
        <TextInput
          label="שם פרטי"
          onChange={(event) => onFirstNameChange(event.nativeEvent.text)}
          icon={<MaterialIcons name="person" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
          error={firstName.showErrorMessage && !firstName.isValid ? firstName.error : ""}
          width="45%"
        />
        <TextInput
          label="שם משפחה"
          onChange={(event) => onLastNameChange(event.nativeEvent.text)}
          icon={<MaterialIcons name="people" color={theme.icons.colors.aqua} size={theme.icons.sizes.m} />}
          error={lastName.showErrorMessage && !lastName.isValid ? lastName.error : ""}
          width="45%"
        />
      </StyledRow>
      <StyledLoginButton onPress={onSignUp} disabled={!email.isValid || !password.isValid || !phone.isValid || !firstName.isValid || !lastName.isValid}>
        <StyledText>צור משתמש</StyledText>
      </StyledLoginButton>
    </StyledWrapper>
  );
};
export default SignUp;
