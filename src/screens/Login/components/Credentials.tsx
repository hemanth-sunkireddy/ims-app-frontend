import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Image } from "@rneui/base";
import global from "../../../styles/global";


function Credentials({ onChangeEmail, onChangePassword, togglePasswordView, displayPassword }) {
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "#000000", // TODO: replace with theme wise color
            marginLeft: 15,
            marginBottom: -9,
            fontWeight: "bold",
          }}
        >
          Email
        </Text>
      </View>
      <TextInput
        style={{ ...global.input, color: "#000000" }} // TODO: replace with theme wise color
        placeholder="Enter your Email"
        placeholderTextColor={"grey"} // TODO: replace with theme wise color
        onChangeText={onChangeEmail}
        inputMode="text"
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "#000000", // TODO: replace with theme wise color
            marginLeft: 15,
            marginBottom: -9,
            fontWeight: "bold",
          }}
        >
          Password
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
      <TextInput
        style={{ ...global.input, color: "#000000", width: '85%', marginLeft: "3%" }} // TODO: replace with theme wise color
        placeholder="Enter your password"
        placeholderTextColor={"grey"} // TODO: replace with theme wise color
        onChangeText={onChangePassword}
        secureTextEntry={displayPassword}
        inputMode="text"

      />
      <TouchableOpacity onPress={togglePasswordView}>
        <Image
          source={require("../../../assets/icons/hide.png")}
          style={{ height: 30, width: 35, marginTop: 25, marginLeft: 10, marginBottom: 20 }}
        />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Credentials;
