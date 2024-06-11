import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";
import notifee from "@notifee/react-native";
import { Text, View, Image } from "react-native";
import * as types from "../../custom-types";
import Connectionstatus from "../../components/Connectionstatus";
import { otherIcons, IconSet } from "../../constants/Icons";
import { get_user_details } from "../../backend_requests/UserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { extend_cookie } from "../../backend_requests/RefreshToken";

const lightIcons: IconSet = otherIcons.light;
const iiitIcon = lightIcons.iiit_big;
const daysDifferenceThreshold = 20;

function Welcome({ navigation }: types.WelcomeScreenProps): React.JSX.Element {
  async function askNotificationPermission() {
    await notifee.requestPermission();
  }

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const handleButtonPress = async () => {
    try {
      const user_details_status = await get_user_details();
      if (user_details_status == true) {
        AsyncStorage.getItem("last_login").then(async (value) => {
          if (value !== null) {
            const lastLoginDate = new Date(value);
            const currentDate = new Date();
            const daysDifference = Math.floor(
              (currentDate.getTime() - lastLoginDate.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            console.log(daysDifference);
            if (daysDifference > daysDifferenceThreshold) {
              const cookie_status = await extend_cookie();
            }
            navigation.navigate("SidebarDisplay");
          }
        });
        navigation.navigate("SidebarDisplay");
      } else {
        navigation.navigate("LoginScreen");
      }
    } catch (error) {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          paddingVertical: 30,
        }}
      >
        <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
          Welcome
        </Text>
      </View>
      <Image
        source={iiitIcon}
        style={{
          width: "70%",
          resizeMode: "stretch",
          height: "30%",
          alignSelf: "center",
        }}
      />
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 60,
        }}
      >
        <Button
          title="Get Started"
          containerStyle={{ width: 250, height: 50 }}
          onPress={handleButtonPress}
          color="#2D0C8B"
        />
      </View>
      <Connectionstatus />
    </SafeAreaView>
  );
}

export default Welcome;
