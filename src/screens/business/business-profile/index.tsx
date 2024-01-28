import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BusinessProfile from "../../../components/business-profile";

import { type Props } from "./types";

const BusinessProfileScreen = ({ isEditMode = false }: Props) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="business-profile">
      <Stack.Screen options={{ title: "פרופיל העסק" }} name="business-profile" children={() => <BusinessProfile isEditMode={isEditMode} />} />
    </Stack.Navigator>
  );
};
export default BusinessProfileScreen;
