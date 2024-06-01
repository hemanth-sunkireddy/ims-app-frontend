import React from "react";
import { Button } from "@rneui/base";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { allCourses } from "../Dashboard/components/CourseTable";
import { COURSE } from "../Dashboard/components/CourseTable";
import global from "../../styles/global";
import { DataTable } from "react-native-paper";
import * as types from "../../custom-types";

import SemesterSelector from "../../components/SemesterSelector";
import { selected_year, selected_sem } from "../../components/SemesterSelector";

interface CourseItem {
  Key: string;
  CourseName: string;
  Total: number;
  Present: number;
  Absent: number;
}

let courseCode = "";
let courseName = "";

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    color: "#7a7a7a",
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
  box: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    padding: 40,
    paddingTop: 0,
    paddingBottom: 20,
    marginBottom: 20,
  },
  box2: {
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#000000",
    margin: 10,
    marginTop: 10,
  },
});

function ViewAttendance({
  _route,
  navigation,
}: types.MyAttendanceProps): React.JSX.Element {
  // code for SelectionList

  const currentYear = new Date().getFullYear();
  const year_data = [];
  for (let i = currentYear; i >= 2016; i--) {
    year_data.push({ key: `${i}`, value: `${i}-${(i + 1) % 100}` });
  }

  // code for courseList
  const [courseList, setCourseList] = React.useState<CourseItem[]>([]);
  const [statusText, setStatusText] = React.useState("Select Year and Sem");
  const filterCourseList = () => {
    const rowslist: CourseItem[] = [];
    const allcourses = allCourses;
    const len = Object.keys(allcourses).length;
    for (let i = 1; i <= len; i += 1) {
      const course = allcourses[i.toString()];
      const CourseName = course.CourseName;
      const Key = course.CourseCode;
      const Total = parseInt(course.TotalClasses);
      const Absent = parseInt(course.absents);
      const Present = parseInt(course.present);
      if (course.Year === selected_year && course.Semester === selected_sem) {
        rowslist.push({ Key, CourseName, Total, Present, Absent });
      }
    }
    if (rowslist.length == 0) {
      setStatusText("No Data Found");
    }
    setCourseList(rowslist);
  };

  const setSemester = () => {
    filterCourseList();
  };

  const handleCourseClick = (item: CourseItem) => {
    courseCode = item.Key;
    courseName = item.CourseName;
    navigation.navigate("CourseAttendance");
  };

  const Selector = () => {
    return (
      <SafeAreaView style={styles.box}>
        <Text style={styles.heading}>Filter Selection</Text>
        <SemesterSelector />
        <Button
          containerStyle={{ marginTop: 30, width: 200 }}
          onPress={setSemester}
          title="Proceed"
          color="#2D0C8B"
          accessibilityLabel="Button setting semester"
        />
      </SafeAreaView>
    );
  };

  const RenderRows = () => {
    return courseList.map((item) => (
      <TouchableOpacity key={item.Key} onPress={() => handleCourseClick(item)}>
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 10 }}>
            <Text numberOfLines={2} style={{ color: "black" }}>
              {item.CourseName}
            </Text>
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }} numeric>
            {item.Total}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 4 }} numeric>
            {item.Present}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }} numeric>
            {item.Absent}
          </DataTable.Cell>
        </DataTable.Row>
      </TouchableOpacity>
    ));
  };

  const CourseList = () => {
    return (
      <View style={styles.box2}>
        <DataTable>
          <DataTable.Header key="Header">
            <DataTable.Title style={{ flex: 4 }}>
              <Text
                style={{ color: "black", fontSize: 15, fontWeight: "bold" }}
              >
                Course Name
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ marginLeft: 5 }}>
              <Text
                style={{ color: "black", fontSize: 12, fontWeight: "bold" }}
              >
                Total
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{}}>
              <Text
                style={{ color: "black", fontSize: 12, fontWeight: "bold" }}
              >
                Present
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ marginLeft: 10 }}>
              <Text
                style={{ color: "black", fontSize: 12, fontWeight: "bold" }}
              >
                Absent
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          {courseList.length === 0 ? (
            <Text style={{ color: "black", textAlign: "center", fontSize: 15 }}>
              {statusText}
            </Text>
          ) : (
            RenderRows()
          )}
        </DataTable>
      </View>
    );
  };

  return (
    <SafeAreaView style={global.container}>
      <ScrollView>
        <Selector />
        <CourseList />
      </ScrollView>
    </SafeAreaView>
  );
}

export { courseCode, courseName };
export default ViewAttendance;
