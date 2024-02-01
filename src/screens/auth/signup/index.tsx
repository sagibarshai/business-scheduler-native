import { useState } from "react";
import { theme } from "../../../../theme";
import TextInput from "../../../components/inputs/text";
import { InputState } from "../../../components/inputs/types";
import {
  StyledIconWrapper,
  StyledTitle,
  StyledWrapper,
  StyledLoginButton,
  StyledText,
  StyledRow,
  StyledLoginButtonWrapper,
  StyledErrorMessage,
  StyledNavigateToLoginPage,
  StyledNavigationToLoginPageText,
} from "./styled";
import { Props } from "./types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  emailErrorMessage,
  firstNameErrorMessage,
  lastNameErrorMessage,
  passwordErrorMessage,
  phoneErrorMessage,
} from "./errors";
import { isEmail, isPhone } from "../../../utils/valitators";
import TelInput from "../../../components/inputs/tel";
import { appAxios } from "../../../../axios";
import { AxiosError } from "axios";
import { CircleSnail } from "react-native-progress";
import { ScrollView } from "react-native";

const SignUp = ({ onNavigateToLoginPage }: Props) => {
  const [email, setEmail] = useState<InputState<string>>({
    error: emailErrorMessage,
    value: "",
    isEditMode: false,
    isValid: false,
    showErrorMessage: false,
  });
  const [password, setPassword] = useState<InputState<string>>({
    error: passwordErrorMessage,
    value: "",
    isEditMode: false,
    isValid: false,
    showErrorMessage: false,
  });
  const [firstName, setFirstName] = useState<InputState<string>>({
    error: firstNameErrorMessage,
    value: "",
    isEditMode: false,
    isValid: false,
    showErrorMessage: false,
  });
  const [lastName, setLastName] = useState<InputState<string>>({
    error: lastNameErrorMessage,
    value: "",
    isEditMode: false,
    isValid: false,
    showErrorMessage: false,
  });
  const [phone, setPhone] = useState<InputState<string>>({
    error: phoneErrorMessage,
    value: "",
    isEditMode: false,
    isValid: false,
    showErrorMessage: false,
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onEmailChange = (text: string) =>
    setEmail({ ...email, value: text, isValid: isEmail(text), showErrorMessage: true });
  const onPasswordChange = (text: string) =>
    setPassword({ ...password, value: text, isValid: text.length >= 8, showErrorMessage: true });
  const onFirstNameChange = (text: string) =>
    setFirstName({ ...firstName, value: text, isValid: text.length >= 2, showErrorMessage: true });
  const onLastNameChange = (text: string) =>
    setLastName({ ...lastName, value: text, isValid: text.length >= 2, showErrorMessage: true });
  const onPhoneChange = (text: string) =>
    setPhone({ ...phone, value: text, isValid: isPhone(text), showErrorMessage: true });

  const onSignUp = async () => {
    setIsLoading(true);
    setError("");

    if (
      !email.isValid ||
      !password.isValid ||
      !phone.isValid ||
      !firstName.isValid ||
      !lastName.isValid
    )
      setError("יש למלא את כל השדות");
    else {
      const body = {
        email: email.value,
        password: password.value,
        phone: phone.value,
        firstName: firstName.value,
        lastName: lastName.value,
      };
      try {
        const loginResponse = (await appAxios.post("/auth/signup", body)).data;
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.data) {
          let errorMessage = error.response.data as { message: string };
          setError(errorMessage.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <ScrollView>
      <StyledWrapper>
        <StyledIconWrapper>
          <MaterialCommunityIcons
            size={100}
            name="briefcase-clock-outline"
            color={theme.icons.colors.aqua}
          />
        </StyledIconWrapper>
        <StyledTitle>ברוך הבא אל Bazzy</StyledTitle>
        <TextInput
          keyboardType={"email-address"}
          label="אימייל"
          onChange={(event) => onEmailChange(event.nativeEvent.text)}
          icon={
            <MaterialIcons
              name="alternate-email"
              color={theme.icons.colors.aqua}
              size={theme.icons.sizes.m}
            />
          }
          error={email.showErrorMessage && !email.isValid ? email.error : ""}
        />
        <TextInput
          textContentType="newPassword"
          label="סיסמא"
          onChange={(event) => onPasswordChange(event.nativeEvent.text)}
          icon={
            <MaterialIcons
              name="security"
              color={theme.icons.colors.aqua}
              size={theme.icons.sizes.m}
            />
          }
          error={password.showErrorMessage && !password.isValid ? password.error : ""}
        />
        <TelInput
          label="טלפון"
          onChange={(event) => onPhoneChange(event.nativeEvent.text)}
          icon={
            <MaterialCommunityIcons
              size={theme.icons.sizes.m}
              color={theme.icons.colors.aqua}
              name="phone-check-outline"
            />
          }
          error={phone.showErrorMessage && !phone.isValid ? phone.error : ""}
        />
        <StyledRow>
          <TextInput
            label="שם פרטי"
            onChange={(event) => onFirstNameChange(event.nativeEvent.text)}
            icon={
              <MaterialIcons
                name="person"
                color={theme.icons.colors.aqua}
                size={theme.icons.sizes.m}
              />
            }
            error={firstName.showErrorMessage && !firstName.isValid ? firstName.error : ""}
            width="45%"
          />
          <TextInput
            label="שם משפחה"
            onChange={(event) => onLastNameChange(event.nativeEvent.text)}
            icon={
              <MaterialIcons
                name="people"
                color={theme.icons.colors.aqua}
                size={theme.icons.sizes.m}
              />
            }
            error={lastName.showErrorMessage && !lastName.isValid ? lastName.error : ""}
            width="45%"
          />
        </StyledRow>
        <StyledLoginButtonWrapper>
          <StyledLoginButton
            onPress={onSignUp}
            disabled={
              isLoading ||
              !email.isValid ||
              !password.isValid ||
              !phone.isValid ||
              !firstName.isValid ||
              !lastName.isValid
            }
          >
            {isLoading ? (
              <CircleSnail color={theme.palette.colors.lights.texts.white} size={30} />
            ) : (
              <StyledText>יצירת משתמש</StyledText>
            )}
          </StyledLoginButton>
          {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
        </StyledLoginButtonWrapper>
      </StyledWrapper>
      <StyledNavigateToLoginPage onPress={onNavigateToLoginPage}>
        <StyledNavigationToLoginPageText>יש חשבון כבר? </StyledNavigationToLoginPageText>
        <StyledNavigationToLoginPageText underline> למסך ההתחברות</StyledNavigationToLoginPageText>
      </StyledNavigateToLoginPage>
    </ScrollView>
  );
};
export default SignUp;
