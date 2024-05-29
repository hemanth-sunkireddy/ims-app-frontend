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
    textDecorationLine: "underline",
  },
});

function About(): React.JSX.Element {
  return (
    <SafeAreaView style={global.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.subHeading}>
          IMS Application for IIIT Hyderabad
        </Text>
        <Text style={styles.description}>
          This app was initially developed as a project for the Design
          and Analysis of Software Systems (DASS) course in the Spring
          2024 semester, under the guidance of Prof. Raghu Reddy.
          Currently, it is an Android mobile application (and soon, iOS too)
          that is dedicated to the IMS website of IIIT Hyderabad.
        </Text>
        <Text style={styles.description}>
          Students can utilise the application to submit requests for leaves,
          view their attendance and transcript, and more. Additionally, they
          can access and view their profile details including general
          information, their address and bank details. They can also add or edit
          their bank details until approved.
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Project Codebase: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/IMS-IIITH/");
          }}
        >
          <Text style={styles.link}>GitHub organisation</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Contribution: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "https://github.com/IMS-IIITH/wiki/wiki/Developer-Documentation",
            );
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

      <View style={{ ...styles.contentContainer, paddingTop: 50 }}>
        <Text style={styles.subHeading}>Credits</Text>
        <Text style={styles.description}>
          This app was initially developed by by Abhiram, Bhav, Hemanth,
          Jakeer and Samyak. It's being further developed and maintained
          by them and the institute Web Admins team.
        </Text>

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
      </View>
    </SafeAreaView>
  );
}

export default About;
