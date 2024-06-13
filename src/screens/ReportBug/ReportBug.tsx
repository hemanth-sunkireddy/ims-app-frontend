import React from "react";
import {
  TouchableOpacity,
  Linking,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import global from "../../styles/global";

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
    color: "black",
  },
  link: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    color: "black",
  },
});

function ReportBug(): React.JSX.Element {
  return (
    <SafeAreaView style={global.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Reporting Bugs</Text>

        <Text style={styles.description}>
          We've put significant effort into minimizing errors in our app, but
          occasional bugs may still slip through our testing phases. If you
          encounter any issues, we encourage you to report them so we can
          address them promptly. We would greatly appreciate it if you could
          follow this basic format when reporting a bug:
        </Text>

        <Text style={styles.subHeading}>Issue Title:</Text>
        <Text style={styles.description}>Briefly mention about the bug.</Text>

        <Text style={styles.subHeading}>Issue Description:</Text>
        <Text style={styles.description}>
          When reporting a bug, please be concise and clear. Include screenshots
          if needed and use tags to help prioritize the issue.
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingTop: 10, paddingLeft: 20 }}>
        <Text style={{ fontWeight: "bold", color: "black" }}>
          Issues page:{" "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/IMS-IIITH/frontend/issues");
          }}
        >
          <Text style={styles.link}>Submit Issue</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", paddingTop: 40, paddingLeft: 20 }}>
        <Text style={styles.description}>
          You can also report bugs by sending an email with the subject line
          "Bug Report for IMS App" to:-{" "}
          <View style={{ flexDirection: "row", paddingTop: 20}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("mailto:webadmin@students.iiit.ac.in");
              }}
            >
              <Text style={styles.link}>webadmin@students.iiit.ac.in</Text>
            </TouchableOpacity>
          </View>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default ReportBug;
