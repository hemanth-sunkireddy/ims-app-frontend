import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import { courses_details } from "../../../constants/APIHandler";
import { getAccessToken } from "../../../backend_requests/AccessToken";

export interface COURSE {
  CourseCode: string;
  CourseName: string;
  Credits: number;
  Semester: string;
  Year: string;
  Grade: string | null;
  TotalClasses: number;
  absents: number;
  present: number;
}

let allCourses: Record<string, COURSE> = {};

function CourseTable(): React.JSX.Element {
  const [courses, setCourses] = useState<Record<string, COURSE>>({});

  const fetchCourseDetails = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 10000);
      });

      const accessToken = await getAccessToken();
      if (accessToken) {
        console.log("Cookies Fetched Success.");
        const responsePromise = fetch(courses_details, {
          method: "GET",
          headers: { Cookie: `access_token_ims_app=${accessToken}` },
        });
        const response = await Promise.race([responsePromise, timeoutPromise]);
        console.log("RESPONSE: ", response);
        const json = await (response as Response).json();
        console.log("JSON FORMAT: ", json);
        setCourses(json);
      } else {
        console.log("Error in Receiving Cookies.");
      }
    } catch (error) {
      console.log("Could not fetch Courses data in the Dashboard");
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  useEffect(() => {
    console.log("Course From Backend: ", courses);
    allCourses = courses;
  }, [courses]);

  useEffect(() => {
    console.log("All Courses: ", allCourses);
  }, [allCourses]);

  // just to trigger useEffect
  return <View />;
}

export { allCourses };
export default CourseTable;
