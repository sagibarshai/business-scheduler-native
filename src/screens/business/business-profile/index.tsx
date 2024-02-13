import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BusinessProfile from "../../../components/business-profile";

import { type Props } from "./types";

const BusinessProfileScreen = ({ allowEdit = true }: Props) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="business-profile"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        title: "הוספת עסק",
        headerBackTitleVisible: false,
        headerBackButtonMenuEnabled: true,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        options={{ title: "פרופיל העסק" }}
        name="business-profile-component"
        children={() => <BusinessProfile allowEdit={allowEdit} />}
      />
    </Stack.Navigator>
  );
};
export default BusinessProfileScreen;
