import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Stage1 from "./stage-1";
import Stage2 from "./stage-2";
import Stage3 from "./stage-3";
import { useEffect } from "react";
import { appAxios } from "../../../../axios";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import {
  setBusinessData,
  setBusinessMetaData,
  setBusinessPhotos,
} from "../../../../redux/featuers/business/businessSlice";
import { SelectedHoursAndDays } from "./stage-1/select-days-and-hours/types";
import { SubCatogory } from "./stage-3/sub-categories/types";
import { Asset } from "react-native-image-picker";

const AddNewBusiness = () => {
  const Stack = createNativeStackNavigator();
  const user = useAppSelector((state) => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appAxios.get("/business", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        if (res) {
          const data = res.data;
          const businessData: {
            id: string;
            address: string;
            business_name: string;
            category: string;
            working_days_and_hours: SelectedHoursAndDays;
            phone: string;
            sub_categories: SubCatogory[];
            business_description: string;
            employees_id: string;
            timestamp: string;
            updated_at: string;
          } = data.businessData;
          const businessImgs: {
            id: string;
            type: Asset["type"];
            base64: Asset["base64"];
            size: Asset["fileSize"];
            img_type: "regular" | "profile" | "cover";
            timestamp: string;
            updated_at: string;
          } = data.businessImgs;
          console.log(res.data.businessData);
          dispatch(
            setBusinessData({
              description: businessData.business_description,
              subCategories: businessData.sub_categories,
            })
          );
          dispatch(
            setBusinessMetaData({
              address: businessData.address,
              category: businessData.category,
              name: businessData.business_name,
              phone: businessData.phone,
              workingDaysAndHours: businessData.working_days_and_hours,
            })
          );
          // dispatch(setBusinessPhotos({profile:}))

          navigation.navigate("business-profile");
        }
      } catch (err) {
        console.log("err ", err);
        const error = err as AxiosError;
        if (error.response?.status === 401) navigation.navigate("auth");
      }
    };
    if (user.token) fetchData();
  }, [user]);

  return (
    <Stack.Navigator
      initialRouteName="stage-1"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        title: "הוספת עסק",
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: true,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="stage-1" component={Stage1} />
      <Stack.Screen name="stage-2" component={Stage2} />
      <Stack.Screen name="stage-3" component={Stage3} />
    </Stack.Navigator>
  );
};
export default AddNewBusiness;
