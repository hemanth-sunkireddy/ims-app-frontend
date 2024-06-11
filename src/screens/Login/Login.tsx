import React, { useEffect } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import { Button } from "@rneui/base";
import * as types from "../../custom-types";
import TreeLogo from "./components/TreeLogo";
import Credentials from "./components/Credentials";
import UpdatePassword from "./components/UpdatePassword";
import styles from "./Styles/LoginStyles";
import Connectionstatus from "../../components/Connectionstatus";
import { authenticate_user } from "../../backend_requests/AuthUser";
import { get_user_details } from "../../backend_requests/UserDetails";
import { askFILEACCESSPERMISSION } from "../../device_permissions/FilePermission";

function Login({ navigation }: types.LoginScreenProps): React.JSX.Element {
  const [Email, onChangeEmail] = React.useState("");
  const [_Password, onChangePassword] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [successText, setSuccessText] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);

  const handleLoginPress = async () => {
    try {
      setErrorText("");
      setIsLoading(true);
      const auth_status = await authenticate_user(
        Email,
        _Password,
        setErrorText,
        setIsLoading,
      );
      if (auth_status === true) {
        // After Successful Authentication, Get User Details
        try {
          setSuccessText("Authentication Success, Getting User Details..");
          const user_details_status = await get_user_details(setErrorText, setSuccessText);
          setIsLoading(false);
          if (user_details_status == true) {
            navigation.navigate("SidebarDisplay");
          }
        } catch (err) {
          setErrorText(
            "Error in getting User Details.",
          );
          setIsLoading(false);
        }
      }
    } catch (error) {
      const eror_message = (error as Error).message;
      setErrorText("Error: " + eror_message);
    }
  };

  useEffect(() => {
    askFILEACCESSPERMISSION();
  }, []);

  return (
    <SafeAreaView style={styles.container2}>
      <SafeAreaView style={{ marginTop: 140 }}>
        <TreeLogo />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 20, textAlign: "center" }}>
            {errorText}
          </Text>
          <Text style={{ color: "#2D0C8B", fontSize: 20 }}>{successText}</Text>
        </View>
        <Credentials
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
          togglePasswordView={() => setShowPassword((prev) => !prev)}
          displayPassword={showPassword}
        />
        <UpdatePassword />
        <View style={{ alignItems: "center" }}>
          <Button
            containerStyle={{ width: 250, height: 50 }}
            onPress={handleLoginPress}
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
                <Text style={{ color: "white" }}>Logging In...</Text>
              </View>
            ) : (
              <Text style={{ color: "white" }}>Login</Text>
            )}
          </Button>
        </View>
      </SafeAreaView>
      <Connectionstatus />
    </SafeAreaView>
  );
}

export default Login;
