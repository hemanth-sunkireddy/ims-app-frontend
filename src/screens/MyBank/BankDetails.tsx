import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Card } from "@rneui/themed";
import { bank_details } from "../../constants/APIHandler";
import { otherIcons, IconSet } from "../../constants/Icons";

import global from "../../styles/global";
import card from "../../styles/card";
import bank from "../../styles/bank";
import * as types from "../../custom-types";
import { getAccessToken } from "../../backend_requests/AccessToken";

const lightIcons: IconSet = otherIcons.light;
const backIcon = lightIcons.back;
const editIcon = lightIcons.edit;

const bankDetailsJSON = {
  hasBankDetails: null,
  bankDetails: {
    applicationStatus: null,
    accountHolderName: null,
    accountNumber: null,
    bankName: null,
    branchName: null,
    ifscCode: null,
    bankAddress: null,
    remarks: null,
    viewAttachment: null,
  },
};

const fieldNames: { [key: string]: string } = {
  applicationStatus: "Application Status",
  accountHolderName: "Account Holder Name as per Bank",
  accountNumber: "Account Number",
  bankName: "Bank Name",
  branchName: "Branch Name",
  ifscCode: "IFSC Code",
  bankAddress: "Bank Address",
  remarks: "Remarks",
  viewAttachment: "Passbook / Canceled Cheque Leaf",
};

function BankDetails({
  _route,
  navigation,
}: types.BankDetailsProps): React.JSX.Element {
  const detailsJSON = bankDetailsJSON;
  const details = JSON.parse(JSON.stringify(detailsJSON));
  const [detailsState, setDetails] = useState(details);
  const [isFetchFine, setIsFetchFine] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchBankDetails = async () => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        setIsFetchFine(false);
        setErrorText("Error in recieving token");
        return;
      }

      const response = await fetch(bank_details, {
        method: "GET",
        headers: { Cookie: `access_token_ims_app=${accessToken}` },
      });
      if (response.status === 200) {
        setIsFetchFine(true);

        const json_response = await response.json();
        setDetails(JSON.parse(JSON.stringify(json_response)));

        setIsLoaded(true);
      } else {
        setIsFetchFine(false);
        setErrorText(response.status);
      }
    } catch (error) {
      setIsFetchFine(false);
      const error_message = (error as Error).message;
      setErrorText("Error: " + error_message);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const headerComponent = (
    <SafeAreaView style={bank.bankDetailsHeader}>
      <TouchableOpacity
        style={bank.bankHeaderBack}
        onPress={() => {
          navigation.navigate("SidebarDisplay");
        }}
      >
        <View>
          <Image
            source={backIcon}
            resizeMode="contain"
            style={global.dashboard_children_section}
          />
        </View>
      </TouchableOpacity>

      <Text style={bank.bankHeaderText}>Bank Details</Text>

      <TouchableOpacity
        style={bank.bankHeaderEdit}
        onPress={() => {
          // TODO: fix one attribute
          if (isFetchFine === false) {
            Alert.alert("", "Server Error.");
          } else if (
            detailsState.hasBankDetails === false ||
            detailsState.bankDetails.applicationStatus !== "Approved"
          ) {
            navigation.navigate("EditBankDetails");
          } else if (
            detailsState.bankDetails.applicationStatus === "Approved"
          ) {
            Alert.alert(
              "",
              "You are not allowed to add another record. Contact Academic office for any change in Bank Account Details.",
            );
          } else {
            Alert.alert("", "Server Error.");
          }
        }}
      >
        <View>
          <Image
            source={editIcon}
            resizeMode="contain"
            style={global.dashboard_children_section}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );

  if (isFetchFine === false) {
    return (
      <SafeAreaView style={global.container}>
        {headerComponent}
        <Text style={bank.noDetailsText}>{errorText}</Text>
      </SafeAreaView>
    );
  }

  // TODO: fix one attribute
  if (detailsState.hasBankDetails === false) {
    return (
      <SafeAreaView style={global.container}>
        {headerComponent}
        <Text style={bank.noDetailsText}>
          No bank details provided. Please press the edit button and upload
          required details.
        </Text>
      </SafeAreaView>
    );
  }

  const fields = Object.keys(detailsState.bankDetails);
  // ASSUMPTION: leaving fields blank if `null` value given, no filler text
  const objectList: Array<React.JSX.Element> = fields.map((value, index) => {
    if (value === "viewAttachment") {
      return (
        <SafeAreaView key={index} style={card.container}>
          <Text style={card.sectionHeader}>{fieldNames[value]}</Text>
          <Card containerStyle={card.card}>
            <TextInput
              style={card.cardTextInput}
              editable={false}
              value={
                detailsState.bankDetails[value]
                  ? detailsState.bankDetails[value].toString()
                  : ""
              }
              multiline={true}
            />
          </Card>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView key={index} style={card.container}>
        <Text style={card.sectionHeader}>{fieldNames[value]}</Text>
        <Card containerStyle={card.card}>
          <TextInput
            style={card.cardTextInput}
            editable={false}
            value={
              detailsState.bankDetails[value]
                ? detailsState.bankDetails[value].toString()
                : ""
            }
            multiline={true}
          />
        </Card>
      </SafeAreaView>
    );
  });

  return (
    <SafeAreaView style={global.container}>
      {isLoaded ? (
        <>
          {headerComponent}
          <ScrollView>{objectList}</ScrollView>
        </>
      ) : (
        <>
          <View style={{ alignItems: "center", marginVertical: 30 }}>
            <ActivityIndicator size="large" color="grey" />
            <Text style={{ color: "black", fontSize: 20 }}>
              Getting Details, Please Wait...
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default BankDetails;
