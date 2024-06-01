import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import LeaveApplicationCss from "../styles/LeaveScreenStyles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list"; // Assuming you have these components
import { allCourses } from "../../Dashboard/components/CourseTable"; // Assuming this is where your course data is stored

import { otherIcons } from "../../../constants/Icons";


export interface CourseRow {
  key: string;
  name: string;
}

const lightIcons = otherIcons.light;
const redDotIcon = lightIcons.red_dot;

function MissedExams({
  leaveforsports,
  setmissedexams,
  setCOURSESMISSED,
}): React.JSX.Element {
  const [missedExams, setMissedExams] = useState("Missed Exams");
  const [missedcourses, setMissedCourses] = useState([]);
  const [presentcourses, setPresentCourses] = useState([]);

  const ListOfReasons = [
    { key: "Select...", value: "Select..." },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];

  const ReasonsforSports = [
    { key: "Select...", value: "Select..." },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];

  // const coursesList = [] // Need to fix this
  const coursesList = Object.values(allCourses).map((course) => ({
    key: course.Course,
    value: course.name,
  }));

  const filterPresentCourses = () => {
    const Rowslist: CourseRow[] = [];
  if (!allCourses) {
    return;
  }
  const presentCourses = Object.values(allCourses).filter(course => course.Grade === null);
  presentCourses.forEach(course => {
    Rowslist.push({ key: course.CourseCode, name: course.CourseName });
  });
  setPresentCourses(Rowslist);
  };

  useEffect(() => {
    setmissedexams(missedExams);
  }, [missedExams]);

  useEffect(() => {
    // console.log(missedcourses)
    setCOURSESMISSED(missedcourses);
  }, [missedcourses]);



  useEffect(() => {
    filterPresentCourses();
  }, []);

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[LeaveApplicationCss.text, { marginBottom: -10 }]}>
              Missed exams during leave?
            </Text>

            <Image source={redDotIcon} style={LeaveApplicationCss.image} />
          </View>
          <View style={{ margin: 20, marginBottom: 5 }}>
            <SelectList
              setSelected={(value) => {
                setMissedExams(value);
                setmissedexams(value);
              }}
              data={ListOfReasons}
              placeholder="Select..."
              search={false}
              dropdownTextStyles={{ color: "black" }}
              inputStyles={{ color: "black" }}
            />
          </View>
          {missedExams === "Yes" ? (
            <View>
              <View>
                <Text style={LeaveApplicationCss.text}>Courses</Text>
              </View>
              <View style={{ margin: 20, marginBottom: 2 }}>
                <MultipleSelectList
                  setSelected={(value) => {
                    setMissedCourses(value);
                  }}
                  data={presentcourses.map(course => ({ key: course.key, value: course.name }))}
                  placeholder="Select..."
                  search={false}
                  dropdownTextStyles={{ color: "black" }}
                  inputStyles={{ color: "black" }}
                />
              </View>
            </View>
          ) : null}
        </View>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={LeaveApplicationCss.text}>
              Leave for only PT/Sports classes
            </Text>

            <Image source={redDotIcon} style={LeaveApplicationCss.image} />
          </View>
          <View style={{ margin: 20 }}>
            <SelectList
              setSelected={(value) => {
                leaveforsports(value); // Passing the value to leaveforsports
              }}
              data={ReasonsforSports}
              placeholder="Select..."
              search={false}
              dropdownTextStyles={{ color: "black" }}
              inputStyles={{ color: "black" }}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

// console.log(courserows)
export default MissedExams;
