import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import global from "../../styles/global";
import { courseCode, courseName } from "./Attendance";
import { getAccessToken } from "../../backend_requests/AccessToken";
import * as types from "../../custom-types";
import { attendance_details } from "../../constants/APIHandler";

interface Attendance {
  Date: string | null;
  Marked: string | null;
}

interface AttendanceJSON {
  AttendanceReport: {
    [key: string]: Attendance;
  };
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    color: "#7a7a7a",
    textAlign: "center",
    fontSize: 25,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  date: {
    flex: 4,
    marginLeft: 40,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'black'
  },
  marked: {
    flex: 1,
    paddingRight: 40,
    color: 'black'
  },
  markedText: {
    fontSize: 18,
    color: 'black'
  },
  headRow: {
    marginTop: 30,
    padding: 10,
    flexDirection: "row",
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  head: {
    flex: 2,
  },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

function CourseAttendanceView({
  navigation,
}: types.CourseAttendanceProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(false);

  const json_to_list = (AttJson: AttendanceJSON) => {
    if (
      Object.values(AttJson.AttendanceReport).length == 0 ||
      AttJson.AttendanceReport["1"].Date === null
    ) {
      Alert.alert("Couldn't find any record for this course");
      navigation.goBack();
    }
    return Object.values(AttJson.AttendanceReport);
  };

  const [attendanceList, setAttendance] = React.useState<Attendance[]>([]);
  const fetchAttendance = async () => {
    setIsLoading(true);
    const accessToken = await getAccessToken();
    if (!accessToken) {
      setError(true);
      setErrorText("Error in recieving Cookies.");
      setIsLoading(false);
      return;
    }
    const attendance_api = attendance_details + "/" + courseCode;
    try {
      const response = await fetch(attendance_api, {
        method: "GET",
        headers: { Cookie: `access_token_ims_app=${accessToken}` },
      });

      if (response.status === 200) {
        const json = await (response as Response).json();
        setAttendance(json_to_list(JSON.parse(JSON.stringify(json))));
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
      else {
        setError(true);
        setErrorText(response.status);
        setIsLoading(false);
      }
    } catch (error) {
      const error_message = (error as Error).message;
      setErrorText(error_message);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const RenderAttendance = ({ item }: { item: Attendance }) => {
    if (item.Date == undefined) {
      return <View></View>;
    }
    return (
      <View key={item.Date} style={styles.row}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{item.Date}</Text>
        </View>
        <View style={styles.marked}>
          <Text style={styles.markedText}>{item.Marked}</Text>
        </View>
      </View>
    );
  };

  const RenderHeader = () => {
    return (
      <View style={styles.headRow}>
        <View style={[styles.head, styles.date]}>
          <Text style={styles.headText}>Date</Text>
        </View>
        <View style={[styles.marked, styles.head]}>
          <Text style={styles.headText}>Marked</Text>
        </View>
      </View>
    );
  };

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text
          style={{ color: "black", marginLeft: 10, fontSize: 20 }}
        >
          {errorText}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={global.container}>
      <Text style={styles.heading}>
        {courseName} ({courseCode})
      </Text>
      {isLoading ? (
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item: Attendance, index: number) => index.toString()}
          data={attendanceList}
          renderItem={RenderAttendance}
          ListHeaderComponent={RenderHeader}
        />
      )}
    </SafeAreaView>
  );
}

export default CourseAttendanceView;
