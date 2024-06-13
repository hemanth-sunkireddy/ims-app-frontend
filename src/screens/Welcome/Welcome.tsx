import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";
import notifee from "@notifee/react-native";
import { Text, View, Image } from "react-native";
import * as types from "../../custom-types";
import { otherIcons, IconSet } from "../../constants/Icons";
import { get_user_details } from "../../backend_requests/UserDetails";
import { getAccessToken } from "../../backend_requests/AccessToken";
import { extend_cookie } from "../../backend_requests/RefreshToken";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const lightIcons: IconSet = otherIcons.light;
const iiitIcon = lightIcons.iiit_big;
const daysDifferenceThreshold = 20;

function Welcome({ navigation }: types.WelcomeScreenProps): React.JSX.Element {
  const [isloading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  async function askNotificationPermission() {
    await notifee.requestPermission();
  }

  useFocusEffect(
    useCallback(() => {
      setSuccessText("");
      setErrorText("");
    }, [])
  );

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const handleButtonPress = async () => {
    try {
      setIsLoading(true);
      setErrorText("");
      setSuccessText("");

      const accessToken = await getAccessToken();
      if (!accessToken) {
        setIsLoading(false);
        navigation.navigate("LoginScreen");
        return;
      }

      const user_details_status = await get_user_details(
        setErrorText,
        setSuccessText,
      );
      if (user_details_status == "success") {
        AsyncStorage.getItem("last_login").then(async (value) => {
          if (value !== null) {
            const lastLoginDate = new Date(value);
            const currentDate = new Date();
            const daysDifference = Math.floor(
              (currentDate.getTime() - lastLoginDate.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            if (daysDifference > daysDifferenceThreshold) {
              const cookie_status = await extend_cookie();
            }

            setIsLoading(false);
            navigation.navigate("SidebarDisplay");
          } else {
            const cookie_status = await extend_cookie();
            setIsLoading(false);
            navigation.navigate("SidebarDisplay");
          }
        });
      } else if (user_details_status == "unauthorized") {
        setIsLoading(false);
        navigation.navigate("LoginScreen");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      const error_message = (error as Error).message;
      setErrorText(error_message);
      setIsLoading(false);
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
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "red",
            fontSize: 20,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {errorText}
        </Text>
        <Text style={{ color: "#2D0C8B", fontSize: 20 }}>{successText}</Text>
      </View>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Button
          containerStyle={{ width: 250, height: 50 }}
          onPress={handleButtonPress}
          disabled={isloading}
          color="#2D0C8B"
        >
          {isloading ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ActivityIndicator
                size="small"
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: "white", fontSize: 15 }}>Loading...</Text>
            </View>
          ) : (
            <Text style={{ color: "white", fontSize: 15 }}>Get Started</Text>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;
