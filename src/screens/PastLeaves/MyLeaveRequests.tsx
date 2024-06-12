import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import { Card } from "@rneui/themed";
import { past_leave_status } from "../../constants/APIHandler";
import { getAccessToken } from "../../backend_requests/AccessToken";
import myleavestyles from "../../styles/myleave";

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
          "Error in recieving token",
        );
        setLoading(false);
      } else {
        try {
          const response = await fetch(past_leave_status, {
            method: "GET",
            headers: { Cookie: `access_token_ims_app=${accessToken}` },
          });
          if (response.status != 200) {
            setError(
              "Error " +
              response.status
            );
            setLoading(false);
          }
          else{
            const responseData = await response.json();
            try {
              if (responseData) {
                const applications: LeaveRequest[] = Object.values(
                  responseData,
                );
                setLeaveRequests(applications);
              }
              setLoading(false);
            } catch (innerError) {
              const error_message = innerError as Error;
              setError("Error in processing" + error_message);
              setLoading(false);
            }
          }
        } catch (fetchError) {
          setError(
            "Error " +
            fetchError,
          );
          setLoading(false);
        }
      }
    } catch (e) {
      setLoading(false);
      setError("Error in recieving cookies");
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
              textAlign: "center",  
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
                textAlign: "center",
              }}
            >
              Total Applications: {leaveRequests.length}
            </Text>
            {leaveRequests.map((request, index) => (
              <Card key={index} containerStyle={{ marginTop: 15 }}>
                <Card.Title><Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15}}>Status: {request.LeaveStatus}</Text></Card.Title>
                <Card.Divider />
                <View style={ myleavestyles.leaveRequestPair}>
                  <Text style={  myleavestyles.leaveRequestKey }>Leave Id:</Text>
                  <Text style={myleavestyles.leaveRequestValue}>{request.LeaveID}</Text>
                </View>
                <View style={ myleavestyles.leaveRequestPair}>
                  <Text style={  myleavestyles.leaveRequestKey}>From Date:</Text>
                  <Text style={myleavestyles.leaveRequestValue}>{request.fromdate}</Text>
                </View>
                <View style={ myleavestyles.leaveRequestPair}>
                  <Text style={ myleavestyles.leaveRequestKey}>To Date:</Text>
                  <Text style={ myleavestyles.leaveRequestValue}>{request.todate}</Text>
                </View>
                <View style={myleavestyles.leaveRequestPair}>
                  <Text style={  myleavestyles.leaveRequestKey }>Total Days:</Text>
                  <Text style={myleavestyles.leaveRequestValue}>{request.TotalDays}</Text>
                </View>
                <View style={myleavestyles.leaveRequestPair}>
                  <Text style={  myleavestyles.leaveRequestKey }>Submit Date:</Text>
                  <Text style={myleavestyles.leaveRequestValue}>{request.SubmitDate}</Text>
                </View>
                <View style={ myleavestyles.leaveRequestPair}>
                  <Text style={  myleavestyles.leaveRequestKey }>Application With:</Text>
                  <Text style={myleavestyles.leaveRequestValue}>{request.application_with}</Text>
                </View>
                <View style={ myleavestyles.leaveRequestPair}>
                  <Text style={ myleavestyles.leaveRequestKey}>Reason for Leave:</Text>
                  <Text style={ myleavestyles.leaveRequestValue}>{request.ReasonForLeave}</Text>
                </View>
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
