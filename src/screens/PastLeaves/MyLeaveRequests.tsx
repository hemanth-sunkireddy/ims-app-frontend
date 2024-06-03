import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import { Card } from "@rneui/themed";
import { past_leave_status } from "../../constants/APIHandler";
import { getAccessToken } from "../../backend_requests/AccessToken";

interface LeaveRequest {
  LeaveID: string;
  LeaveStatus: string;
  ReasonForLeave: string;
  SubmitDate: string;
  TotalDays: number;
  application_with: string;
  fromdate: string;
  todate: string;
}

function MyLeaveRequests(): React.JSX.Element {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getLeaveRequest = async () => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        setError(
          "Error in Receiving Access Token of the user. Please try again after sometime.",
        );
        setLoading(false);
      } else {
        try {
          const response = await fetch(past_leave_status, {
            method: "GET",
            headers: { Cookie: `access_token_ims_app=${accessToken}` },
          });
          if (!response.ok) {
            setError(
              "Error in Fetching Past Leave Requests." +
                response.status +
                " " +
                response.statusText,
            );
          }
          const responseData = await response.json();
          try {
            if (responseData && responseData.Applications) {
              const applications: LeaveRequest[] = Object.values(
                responseData.Applications,
              );
              setLeaveRequests(applications);
            }
          } catch (innerError) {
            const error_message = innerError as Error;
            setError("Error processing inner response data." + error_message);
          }
        } catch (fetchError) {
          setError(
            "Internal Server Error in fetching Past Leave Requests." +
              fetchError,
          );
        }
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError("Error in Receiving Cookies, Please try again after sometime.");
    }
  };

  useEffect(() => {
    getLeaveRequest();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {loading && (
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              color: "black",
              marginLeft: 50,
            }}
          >
            Getting Details, Please Wait...
          </Text>
        )}
        {!error && !loading && (
          <>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
                color: "black",
                marginLeft: 50,
              }}
            >
              Total Number of Applications: {leaveRequests.length}
            </Text>
            {leaveRequests.map((request, index) => (
              <Card key={index} containerStyle={{ marginTop: 15 }}>
                <Card.Title>Status: {request.LeaveStatus}</Card.Title>
                <Card.Divider />
                <Text>Total Days: {request.TotalDays}</Text>
                <Text>Submit Date: {request.SubmitDate}</Text>
                <Text>Application With: {request.application_with}</Text>
                <Text>From Date: {request.fromdate}</Text>
                <Text>To Date: {request.todate}</Text>
                <Text>Reason for Leave: {request.ReasonForLeave}</Text>
              </Card>
            ))}
          </>
        )}

        {error && (
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              color: "red",
              marginLeft: 50,
            }}
          >
            {error}
          </Text>
        )}
        <View style={{ margin: 20 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyLeaveRequests;
