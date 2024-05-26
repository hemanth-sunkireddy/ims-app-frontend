import React from "react";
import {
  TouchableOpacity,
  Linking,
  View,
  SafeAreaView,
  Text,
  StyleSheet
} from "react-native";
import global from "../../styles/global";

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black"
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black"
  },
  description: {
    fontSize: 16,
    marginBottom: 10
  },
  link: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline"
  }
});

function ReportBug(): React.JSX.Element {
  return (
    <SafeAreaView style={global.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Reporting Bugs</Text>
        
        <Text style={styles.description}>
          We have tried to implement the app with as few errors as possible. However, there
          may always be bugs here and there that slipped through our testing phases. If you
          find any such bugs, feel free to raise issues on them so that we can get to fixing
          them as soon as possible. We'll be grateful if you follow this basic format while
          reporting a bug.
        </Text>

        <Text style={styles.subHeading}>Issue Title:</Text>
        <Text style={styles.description}>maximum 7-8 words</Text>
        <Text style={styles.subHeading}>Issue Description:</Text>
        <Text style={styles.description}>
          Be brief and concise in descring the bug. Try to mention relevant points in bullets.
          Add screenshots wherever necessary. Add tags to the issue to help in prioritising.
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingTop: 20, paddingLeft: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Issues page: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/IMS-IIITH/frontend/issues");
          }}
        >
          <Text style={styles.link}>https://github.com/IMS-IIITH/frontend/issues</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ReportBug;