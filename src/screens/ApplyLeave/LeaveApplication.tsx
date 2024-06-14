import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Alert } from "react-native";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import FromToDate from "./components/FromToDate";
import DocumentAdd from "./components/DocumentUpload";
import Remarks from "./components/Remarks";
import ReasonForLeave from "./components/ReasonForLeave";
import MissedExams from "./components/MissedExams";
import { useEffect } from "react";
import { rollno } from "../../backend_requests/UserDetails";
import { postLeaveToServer } from "../../backend_requests/PostLeave";

function LeaveApplication(): React.JSX.Element {
  const navigation = useNavigation();
  const todayDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [totalDays, setTotalDays] = useState(1);
  const [sportsleave, setSportsLeave] = useState(null);
  const [justificationforleave, setJustificationForLeave] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file1_base64, setFILE1BASE64] = useState("");
  const [file2_base64, setFILE2BASE64] = useState("");
  const [reasonforleave, setReasonForLeave] = useState(null);
  const [patientCategory, setPatientCategory] = useState(null);
  const [doctorCategory, setDoctorCategory] = useState(null);
  const [EventCategory, setEventCategory] = useState(null);
  const [Presentation, setPresentation] = useState(null);
  const [url, setUrl] = useState(null);
  const [missedexams, setmissedexams] = useState(null);
  const [listOfCoursesMissed, setLISTOFCOURSESMISSED] = useState([]);
  const [fromEventDate, setFromEventDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [toEventDate, setToEventDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    if (reasonforleave === "Sickness") {
      setEventCategory(null);
      setUrl(null);
      setPresentation(null);
    } else if (
      reasonforleave === "Family Emergency" ||
      reasonforleave === "Any Other"
    ) {
      setEventCategory(null);
      setUrl(null);
      setPresentation(null);
      setDoctorCategory(null);
      setPatientCategory(null);
    } else if (reasonforleave === "Technical Event") {
      setDoctorCategory(null);
      setPatientCategory(null);
    } else if (
      reasonforleave === "Sports Event" ||
      reasonforleave === "Cultural Event"
    ) {
      setEventCategory(null);
      setUrl(null);
      setPresentation(null);
      setDoctorCategory(null);
      setPatientCategory(null);
    }
  }, [reasonforleave]);

  const showConfirmDialog = () => {
    const fromDateObj = new Date(fromDate); // convert back date from string to date to check to date is greater than from date.
    const toDateObj = new Date(toDate);
    if (fromDateObj.getTime() > toDateObj.getTime()) {
      return Alert.alert(
        "Alert",
        "Please select To Date greater than From Date.",
        [{ text: "OK" }],
      );
    } else if (file1 == null && file2 == null) {
      return Alert.alert("Alert", "Please Upload the Relevant Document.", [
        { text: "OK" },
      ]);
    } else if (!justificationforleave) {
      return Alert.alert(
        "Alert",
        "Please Fill the Justification for the leave applicatio n.",
        [{ text: "OK" }],
      );
    } else if (!sportsleave || sportsleave == "Select...") {
      return Alert.alert(
        "Alert",
        "Please Choose Whether the Leave is for Sports/Yoga or Not.",
        [{ text: "OK" }],
      );
    } else if (!missedexams) {
      return Alert.alert(
        "Alert",
        "Please Fill whether the exams missed or not.",
        [{ text: "OK" }],
      );
    } else if (!reasonforleave) {
      return Alert.alert("Alert", "Please Choose the reason for Leave", [
        { text: "OK" },
      ]);
    } else {
      return Alert.alert("Alert", "Are you sure you want to Submit?", [
        {
          text: "Yes",
          onPress: () => {
            const json_to_send = {
              rollNumber: rollno,
              fromDate: fromDate,
              toDate: toDate,
              totalDays: totalDays,
              reasonForLeave: reasonforleave,
              "leaveForOnlyPT/Sports": sportsleave,
              justificationForLeave: justificationforleave,
              patientCategory: patientCategory,
              doctorCategory: doctorCategory,
              eventType: EventCategory,
              areYouPresentingAPaper: Presentation,
              eventStartDate: fromEventDate,
              eventEndDate: toEventDate,
              eventURL: url,
              missedExamsForLeave: missedexams,
              semesterCourses: listOfCoursesMissed,
              remarks: remarks,
              applicationDate: todayDate,
              attachment1: file1_base64,
              attachment2: file2_base64,
            };
            postLeaveToServer(json_to_send)
              .then((status_of_request) => {
                if (status_of_request) {
                  Alert.alert("Alert", "Submitted Successfully");
                  navigation.navigate("MyLeaves");
                } else {
                  Alert.alert("Error in sending the Request");
                }
              })
              .catch((error) => {
                Alert.alert("Error in sending the Request.");
              });
          },
        },

        {
          text: "No",
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#ffffff" }}>
        <FromToDate
          setfromdate={setFromDate}
          settodate={setToDate}
          settotaldays={setTotalDays}
          fromdatetext="From Date"
          todatetext="To Date"
        />
        <ReasonForLeave
          leavereason={setReasonForLeave}
          patientscategory={setPatientCategory}
          doctorscategory={setDoctorCategory}
          eventscategory={setEventCategory}
          presentation={setPresentation}
          URL={setUrl}
          setFromEventDate={setFromEventDate}
          setToEventDate={setToEventDate}
        />
        <MissedExams
          leaveforsports={setSportsLeave}
          setmissedexams={setmissedexams}
          setCOURSESMISSED={setLISTOFCOURSESMISSED}
        />
        <Remarks
          leavejustification={setJustificationForLeave}
          leaveremarks={setRemarks}
        />
        <DocumentAdd
          pickfile1={setFile1}
          pickfile2={setFile2}
          file1_base64={setFILE1BASE64}
          file2_base64={setFILE2BASE64}
        />
        <View style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
          <Button
            title="Submit"
            containerStyle={{ width: 250, height: 50 }}
            onPress={() => showConfirmDialog()}
            color="#2D0C8B"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LeaveApplication;
