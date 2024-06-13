import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import notifee from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onDisplayNotification } from "../../components/SendNotification";

function Notification(): React.JSX.Element {
  const [presentState, setpresentState] = useState("");
  const [_storedState, setStoredState] = useState("");

  useEffect(() => {
    // Retrieve the stored status when the component mounts
    async function getStoredStatus() {
      try {
        const value = await AsyncStorage.getItem("initial_status");
        if (value !== null) {
          setStoredState(value);
          // console.log("Initially, retrived value from the storage and set to storedState", value);
        }
      } catch (e) {
        // console.log(e);
      }
    }
    getStoredStatus();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("initial_status");
      // console.log("Already Stored State: ", value);
      // console.log("Present State: ", presentState);

      if (value !== presentState) {
        setStoredState(value); // Update stored state displayed on the screen
        onDisplayNotification("Your Leave Application Status Updated");
      }
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    // Run getData after presentState changes
    if (presentState !== "") {
      getData();
    }
  }, [presentState]);

  const _storeData = async (status: string) => {
    try {
      await AsyncStorage.setItem("initial_status", status);
      // console.log("Stored the Applied Status Successfully.");
      setpresentState(status);

      // Trigger notification if status is different from the stored value
      if (status !== (await AsyncStorage.getItem("initial_status"))) {
        onDisplayNotification("Your Leave Application Status Updated");
      }
    } catch (e) {
      // console.log(e);
    }
  };

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
          {/* /tle="Apply for Leave (Dummy)" onPress={() => setpresentState("Applied")} color="#2D0C8B"/> */}
        </View>
        <View style={{ margin: 50 }}>
          {/* <Button title="Update Status (Dummy)" onPress={() => setpresentState("Approved")} color="#2D0C8B"/> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Notification;
