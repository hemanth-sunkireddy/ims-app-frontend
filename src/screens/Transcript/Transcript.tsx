import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Button } from "@rneui/base";
import SemesterSelector from "../../components/SemesterSelector";
import { transcript_details } from "../../constants/APIHandler";
import { getAccessToken } from "../../backend_requests/AccessToken";
import { selected_year, selected_sem } from "../../components/SemesterSelector";

import { allCourses } from "../Dashboard/components/CourseTable";

interface TRANSCRIPT {
  CourseCode: string;
  CourseName: string;
  Credits: number;
  Grade: string | null;
}
[];

interface CompleteGPA {
  [semesterYear: string]: {
    cgpa: number;
    sgpa: number;
  };
}

interface FILTEREDGPA {
  cgpa: number;
  sgpa: number;
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    color: "#7a7a7a",
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  row: {
    flexDirection: "row",
  },
  box: {
    borderRadius: 10,
    justifyContent: "space-evenly",
    backgroundColor: "#FAFAFA",
    padding: 40,
    paddingTop: 0,
    paddingBottom: 20,
    marginBottom: 20,
  },
  cell: {
    borderColor: "black",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    borderColor: "black",
    alignSelf: "center",
  },
  headingRow: {
    backgroundColor: "lightgray",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 11,
    color: "black",
  },
  input3: {
    height: 100,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 13,
    width: "90%",
    alignSelf: "center",
    textAlignVertical: "top",
    flexWrap: "wrap",
    borderRadius: 6,
  },
});

function Transcript(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  let defaultYearOption = "";
  let defaultSemOption = "";
  if (currentMonth > 7 && currentMonth <= 12) {
    defaultYearOption = `${currentYear}-${(currentYear + 1) % 100}`;
    defaultSemOption = "Monsoon";
  } else {
    defaultYearOption = `${currentYear - 1}-${currentYear % 100}`;
    defaultSemOption = "Spring";
  }

  const [selectedYear, setSelectedYear] = useState<string>(defaultYearOption);
  const [selectedSem, setSelectedSem] = useState<string>(defaultSemOption);

  const screenWidth = Dimensions.get("window").width;
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [completegpa, setCompletegpa] = useState({} as CompleteGPA);
  const [filteredgpa, setFilteredGPA] = useState({});
  const [record, setRecord] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Choose Year and Semester");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchGpa = async () => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        setError(true);
        setErrorText("Error in recieving cookies.");
        setIsLoading(false);
        return;
      }
      const response = await fetch(transcript_details, {
        method: "GET",
        headers: { Cookie: `access_token_ims_app=${accessToken}` },
      });
      if (response.status != 200) {
        setError(true);
        setErrorText(response.status + "Error in Fetching GPA");
      } else if (response.status === 200) {
        const responseData = await response.json();
        setCompletegpa(responseData);
      }
    } catch (error) {
      setError(true);
      const error_message = (error as Error).message;
      setErrorText(error_message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const len = Object.keys(allCourses).length;
      if (len === 0) {
        setError(true);
        setErrorText("Error Fetching Courses");
        setIsLoading(false);
      } else {
        fetchGpa();
      }
    }, 3000);
  }, []);

  const columnFractions = [0.25, 0.45, 0.15, 0.15];

  const addCourses = () => {
    setRecord(true);
    const fetchedCourses = allCourses;
    const resultCourses = Object.values(fetchedCourses).filter((course) => {
      return course.Year === selected_year && course.Semester === selected_sem;
    });
    setFilteredCourses(resultCourses);
  };

  const addGPA = () => {
    const semesterKeyParts = selected_year.split("-");
    let formattedSemesterKey;
    if (selected_sem == "Monsoon") {
      formattedSemesterKey = selected_sem + semesterKeyParts[0];
    } else {
      formattedSemesterKey = selected_sem + "20" + semesterKeyParts[1];
    }
    if (completegpa[formattedSemesterKey]) {
      const { cgpa, sgpa } = completegpa[formattedSemesterKey];
      setFilteredGPA({ cgpa, sgpa });
    } else {
      setFilteredGPA({ cgpa: 0, sgpa: 0 });
    }
  };

  const handleSelection = () => {
    if (selected_year != null && selected_year != "Select...") {
      if (selected_sem == "Spring" || selected_sem == "Monsoon") {
        setIsLoading(true);

        setSelectedSem(selected_sem);
        setSelectedYear(selected_year);

        addCourses();
        addGPA();
        setLoadingText("");

        setIsLoading(false);
        return;
      }
    }
    return Alert.alert("Alert", "Please fill all the fields", [{ text: "OK" }]);
  };

  const renderTableCells = (filteredCourses) => {
    const cells = [];

    if (filteredCourses.length === 0) {
      // If there are no filtered courses, display "No Data Found"
      return (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "black" }}>No Data Found</Text>
        </View>
      );
    }

    const headings = ["CourseCode", "CourseName", "Credits", "Grade"];

    // render heading row
    const headingRowCells = headings.map((heading, index) => (
      <View
        key={index}
        style={[
          styles.cell,
          { width: (screenWidth - 30) * columnFractions[index] },
        ]}
      >
        <Text style={styles.headingText}>{heading}</Text>
      </View>
    ));

    cells.push(
      <View style={[styles.row, styles.headingRow]} key="headingRow">
        {headingRowCells}
      </View>,
    );

    // render rows
    filteredCourses.forEach((course, index) => {
      const rowCells = headings.map((heading, columnIndex) => (
        <View
          key={columnIndex}
          style={[
            styles.cell,
            { width: (screenWidth - 30) * columnFractions[columnIndex] },
          ]}
        >
          <Text style={{ color: "black" }}>{course[heading]}</Text>
        </View>
      ));

      cells.push(
        <View key={index} style={styles.row}>
          {rowCells}
        </View>,
      );
    });
    return cells;
  };

  const Selector = () => {
    return (
      <SafeAreaView style={styles.box}>
        <Text style={styles.heading}>Filter Selection</Text>
        <SemesterSelector defaultYear={selectedYear} defaultSem={selectedSem} />
        <View style={{ marginVertical: 30, alignItems: "center" }}>
          <Button
            containerStyle={{ width: 200 }}
            onPress={handleSelection}
            title="Proceed"
            color="#2D0C8B"
          />
        </View>
      </SafeAreaView>
    );
  };

  const EndOfRecord = () => {
    if (record) {
      return (
        <View style={{ marginBottom: 30, alignItems: "center", marginTop: 8 }}>
          <Text style={{ fontWeight: "900", fontSize: 15, color: "black" }}>
            *End of Record*
          </Text>
        </View>
      );
    }
    return null;
  };

  const PreHeading = (semester: string, year: string) => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginVertical: 10,
            color: "black",
            marginLeft: screenWidth * 0.03,
          }}
        >
          {semester + " " + year}
        </Text>
      </View>
    );
  };

  const GPAInfo = (props: {
    sgpa: number;
    cgpa: number;
  }): React.JSX.Element => {
    const { sgpa, cgpa } = props;
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: screenWidth * 0.05,
          marginTop: 10,
          marginVertical: 20,
        }}
        key={1}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", color: "black" }}>
          SGPA: {sgpa.toString()}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "bold", color: "black" }}>
          CGPA: {cgpa.toString()}
        </Text>
      </View>
    );
  };

  if (loading === true) {
    return (
      <SafeAreaView>
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <ActivityIndicator size="large" color="grey" />
          <Text style={{ color: "black", fontSize: 20 }}>
            Getting Details, Please Wait...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error === true) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {errorText}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Selector />
        <Text style={{ fontSize: 20, textAlign: "center", color: "black" }}>
          {loadingText}
        </Text>
        {record && (
          <View>
            {PreHeading(selectedSem, selectedYear)}
            <View
              style={[styles.table, { width: screenWidth - 30 }]}
              key="coursesTable"
            >
              {renderTableCells(filteredCourses)}
            </View>
            <GPAInfo sgpa={filteredgpa.sgpa} cgpa={filteredgpa.cgpa} />
          </View>
        )}
        <EndOfRecord />
      </ScrollView>
    );
  }
}

export default Transcript;
