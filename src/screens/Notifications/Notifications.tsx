import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onDisplayNotification } from "../../components/SendNotification";

function Notification(): React.JSX.Element {

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ margin: 50 }}>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              marginBottom: 15,
              padding: 5,
            }}
          >
            Currently, notifications are set up to inform you of the status of
            your leave request or bank details submission immediately after you
            apply.
          </Text>
          <Text style={{ color: "black", fontSize: 20, padding: 5 }}>
            In the future, this notification system will be expanded to include
            updates on the approval or rejection status of your leave requests
            and bank details submissions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Notification;
