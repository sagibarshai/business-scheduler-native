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
import { emailErrorMessage, passwordErrorMessage } from "./errors";
import { isEmail } from "../../../utils/valitators";
import { appAxios } from "../../../../axios";
import { AxiosError } from "axios";
import { CircleSnail } from "react-native-progress";
import { ScrollView } from "react-native";
import { User, setUser } from "../../../../redux/featuers/user/userSlice";
import { useAppDispatch } from "../../../../redux/store";

const Login = ({ onNavigateToSignUpPage }: Props) => {
  const appDispatch = useAppDispatch();

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

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onEmailChange = (text: string) =>
    setEmail({ ...email, value: text, isValid: isEmail(text), showErrorMessage: true });
  const onPasswordChange = (text: string) =>
    setPassword({ ...password, value: text, isValid: text.length >= 8, showErrorMessage: true });

  const onLogin = async () => {
    setIsLoading(true);
    setError("");

    if (!email.isValid || !password.isValid) setError("יש למלא את כל השדות");
    else {
      const body = {
        email: email.value,
        password: password.value,
      };
      try {
        const userData: { user: User; token: string } = (await appAxios.post("/auth/login", body))
          .data;
        const user = {
          account_verified: userData.user.account_verified,
          email: userData.user.email,
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          last_login: userData.user.last_login,
          id: userData.user.id,
          phone: userData.user.phone,
          role: userData.user.role,
          token: userData.token,
        };
        appDispatch(setUser(user));
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
          keyboardType="email-address"
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
          textContentType="password"
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

        <StyledLoginButtonWrapper>
          <StyledLoginButton
            onPress={onLogin}
            disabled={isLoading || !email.isValid || !password.isValid}
          >
            {isLoading ? (
              <CircleSnail color={theme.palette.colors.lights.texts.white} size={30} />
            ) : (
              <StyledText>התחברות</StyledText>
            )}
          </StyledLoginButton>
          {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
        </StyledLoginButtonWrapper>
      </StyledWrapper>
      <StyledNavigateToLoginPage onPress={onNavigateToSignUpPage}>
        <StyledNavigationToLoginPageText>אין חשבון? </StyledNavigationToLoginPageText>
        <StyledNavigationToLoginPageText underline> למסך ההרשמה</StyledNavigationToLoginPageText>
      </StyledNavigateToLoginPage>
    </ScrollView>
  );
};
export default Login;
