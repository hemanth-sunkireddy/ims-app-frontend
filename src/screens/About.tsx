import React from "react";
import {
  TouchableOpacity,
  Linking,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import global from "../styles/global";

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
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline"
  }
});

function About(): React.JSX.Element {
  return (
    <SafeAreaView style={global.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.subHeading}>
          IMS Application for IIIT Hyderabad
        </Text>
        <Text style={styles.description}>
          {"     "}
          This project involves the development of a mobile application for
          Android and iOS platforms dedicated to the IMS website of IIIT
          Hyderabad. Students can utilise the application to submit requests for
          leave, view their attendance and transcript.
        </Text>
        <Text style={styles.description}>
          Furthermore, students can access and view their profile details
          including address, bank details and general information. Additionally
          students can add or edit bank details.
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>App Codebase: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/IMS-IIITH/frontend");
          }}
        >
          <Text style={styles.link}>GitHub repository</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Contribution: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/IMS-IIITH/wiki/wiki/Developer-Documentation");
          }}
        >
          <Text style={styles.link}>Developer Manual</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Report Issues: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/IMS-IIITH/frontend/issues");
          }}
        >
          <Text style={styles.link}>Issues page</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.subHeading}>This app has been made with ❤️ (and ☕) by Abhiram, Bhav, Hemanth, Jakeer and Samyak. It's being further developed and maintained by them and institute Web Admins.</Text>

      <View style={{ flexDirection: "row", paddingTop: 20 }}>
        <Text style={styles.description}>Contact: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("mailto:webadmin@students.iiit.ac.in");
          }}
        >
          <Text style={styles.link}>webadmin@students.iiit.ac.in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default About;
