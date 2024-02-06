import { AxiosError } from "axios";
import {
  StyledUserText,
  StyledBusinessButton,
  StyledBusinessText,
  StyledUserButton,
  StyledWrapper,
} from "./styled";
import { appAxios } from "../../../../axios";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { setUser } from "../../../../redux/featuers/user/userSlice";

const ConfigRole = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = async (role: "business" | "user") => {
    try {
      await appAxios.put(
        "/user/set-role",
        { role },
        {
          headers: {
            Authorization: `Berar ${user.token}`,
          },
        }
      );
      dispatch(setUser({ ...user, role }));
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
    }
  };

  return (
    <StyledWrapper>
      <StyledBusinessButton onPress={() => onSubmit("business")}>
        <StyledBusinessText>עסק</StyledBusinessText>
      </StyledBusinessButton>
      <StyledUserButton onPress={() => onSubmit("user")}>
        <StyledUserText>משתמש</StyledUserText>
      </StyledUserButton>
    </StyledWrapper>
  );
};
export default ConfigRole;
