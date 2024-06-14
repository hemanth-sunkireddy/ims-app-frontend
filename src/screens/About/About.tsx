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
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

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
    color: "black",
  },
  link: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    color: "black",
  },
});

function About(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <SafeAreaView style={global.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.subHeading}>
              IMS Application for IIIT Hyderabad
            </Text>
            <Text style={styles.description}>
              This app originated as a project for the Design and Analysis of
              Software Systems (DASS) course in the Spring 2024 semester, guided
              by Prof. Raghu Reddy.
            {"\n"}
              It is currently developed as an Android mobile application, with
              an iOS version coming soon, dedicated to the IMS (Institute
              Management System) of IIIT Hyderabad.
            </Text>
            <Text style={styles.description}>
              Students can use the application to submit leave requests, add
              bank accounts, and view their attendance, transcripts, and profile
              details, including general information and address. They can also
              check the status of their leave requests and bank applications.
              Additionally, students can add or edit their bank details until
              they receive approval.
              {"\n"}
              More features are planned for the upcoming versions.
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 20 }}
          >
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
              Project Codebase:{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://github.com/IMS-IIITH/");
              }}
            >
              <Text style={styles.link}>GitHub</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
              Contribution:{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://github.com/IMS-IIITH/docs/wiki/");
              }}
            >
              <Text style={styles.link}>Developer Manual</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
              Report Issues:{" "}
            </Text>
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
              This app was initially developed by
              <Text
                style={{ color: "blue" }}
                onPress={() =>
                  Linking.openURL("https://github.com/abhiramtilakiiit")
                }
              >
                {" "}
                Abhiram Tilak
              </Text>
              ,
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL("https://github.com/bhavberi")}
              >
                {" "}
                Bhav Beri
              </Text>
              ,
              <Text
                style={{ color: "blue" }}
                onPress={() =>
                  Linking.openURL("https://github.com/jakeer-hussain")
                }
              >
                {" "}
                Jakeer Hussain
              </Text>
              ,
              <Text
                style={{ color: "blue" }}
                onPress={() =>
                  Linking.openURL("https://github.com/hemanth-sunkireddy")
                }
              >
                {" "}
                Hemanth Sunkireddy
              </Text>
              , and{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL("https://github.com/someyuck")}
              >
                {" "}
                Samyak Mishra
              </Text>
              . It's being further developed and maintained by them and the
              Institute WebAdmins team.
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
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default About;
